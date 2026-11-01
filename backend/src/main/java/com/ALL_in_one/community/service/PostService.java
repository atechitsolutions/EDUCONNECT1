package com.ALL_in_one.community.service;

import com.ALL_in_one.community.dto.CommunityDtos.PageView;
import com.ALL_in_one.community.dto.PostDtos.*;
import com.ALL_in_one.community.entity.*;
import com.ALL_in_one.community.repository.*;
import com.ALL_in_one.entity.User;
import com.ALL_in_one.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class PostService {

    private static final Set<String> CATEGORIES = Set.of(
            "GENERAL", "PROJECT", "IDEA", "QUESTION", "ACHIEVEMENT", "JOB"
    );

    private static final Set<String> VISIBILITIES = Set.of(
            "PUBLIC", "CONNECTIONS", "PRIVATE"
    );

    private static final Map<String, String> IMAGE_TYPES = Map.of(
            "image/jpeg", "jpg",
            "image/png", "png",
            "image/webp", "webp",
            "image/gif", "gif"
    );

    private static final Pattern HASHTAG =
            Pattern.compile("(?<![\\p{L}\\p{N}_&])#([\\p{L}\\p{N}_]{2,40})");

    private static final Pattern MENTION =
            Pattern.compile("(?<![\\p{L}\\p{N}_])@([a-zA-Z0-9_]{3,40})");

    private static final int MAX_IMAGES = 4;
    private static final long MAX_IMAGE_BYTES = 5L * 1024 * 1024;
    private static final String MEDIA_PREFIX = "/posts/media/";

    public record MediaFile(Path path, String contentType) {}

    private final UserRepository users;
    private final StudentProfileRepository profiles;
    private final FriendshipRepository friendships;
    private final UserBlockRepository blocks;
    private final CommunityReportRepository reports;
    private final CommunityNotificationRepository notifications;

    private final PostRepository posts;
    private final PostMediaRepository media;
    private final PostLikeRepository likes;
    private final SavedPostRepository saves;
    private final PostShareRepository shares;
    private final PostCommentRepository comments;

    private final Path uploadRoot;

    public PostService(
            UserRepository users,
            StudentProfileRepository profiles,
            FriendshipRepository friendships,
            UserBlockRepository blocks,
            CommunityReportRepository reports,
            CommunityNotificationRepository notifications,
            PostRepository posts,
            PostMediaRepository media,
            PostLikeRepository likes,
            SavedPostRepository saves,
            PostShareRepository shares,
            PostCommentRepository comments,
            @Value("${app.community.upload-dir:uploads/community}")
            String uploadDir
    ) {
        this.users = users;
        this.profiles = profiles;
        this.friendships = friendships;
        this.blocks = blocks;
        this.reports = reports;
        this.notifications = notifications;
        this.posts = posts;
        this.media = media;
        this.likes = likes;
        this.saves = saves;
        this.shares = shares;
        this.comments = comments;

        this.uploadRoot = Path.of(uploadDir).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.uploadRoot);
        } catch (IOException e) {
            throw new IllegalStateException(
                    "Cannot create upload directory " + this.uploadRoot, e
            );
        }
    }

    // FEED

    @Transactional(readOnly = true)
    public PageView<PostView> feed(
            String email,
            String scope,
            String category,
            String sort,
            String q,
            int page,
            int size
    ) {
        User me = current(email);

        int safePage = Math.max(0, page);
        int safeSize = Math.max(1, Math.min(size, 30));

        String term = clean(q, 100);
        String tag = null;

        if (term != null && term.startsWith("#")) {
            String candidate = term.substring(1).toLowerCase(Locale.ROOT);

            tag = candidate.matches("[\\p{L}\\p{N}_]{1,40}")
                    ? candidate : "__no_match__";

            term = null;
        }

        String cat = category == null
                ? null : category.trim().toUpperCase(Locale.ROOT);

        if (cat != null && !CATEGORIES.contains(cat)) {
            cat = null;
        }

        String order = sort == null
                ? "latest" : sort.trim().toLowerCase(Locale.ROOT);

        LocalDateTime since =
                LocalDateTime.of(2000, 1, 1, 0, 0);

        Sort sorting = Sort.by(Sort.Direction.DESC, "createdAt")
                .and(Sort.by(Sort.Direction.DESC, "id"));

        if ("trending".equals(order)) {
            since = LocalDateTime.now().minusDays(30);

            sorting = Sort.by(Sort.Direction.DESC, "likeCount")
                    .and(Sort.by(Sort.Direction.DESC, "commentCount"))
                    .and(Sort.by(Sort.Direction.DESC, "id"));

        } else if ("recent".equals(order)) {
            since = LocalDateTime.now().minusDays(2);
        }

        String normalizedScope = scope == null
                ? "all" : scope.trim().toLowerCase(Locale.ROOT);

        Long authorId = "mine".equals(normalizedScope)
                ? me.getId() : 0L;

        boolean savedOnly = "saved".equals(normalizedScope);

        Page<Post> result = posts.feed(
                me.getId(),
                withSentinel(friendIds(me.getId())),
                withSentinel(blockedIds(me.getId())),
                authorId,
                savedOnly,
                cat,
                tag,
                term,
                since,
                PageRequest.of(safePage, safeSize, sorting)
        );

        return new PageView<>(
                toViews(result.getContent(), me.getId()),
                result.getNumber(),
                result.getSize(),
                result.getTotalElements(),
                result.getTotalPages()
        );
    }

    @Transactional(readOnly = true)
    public PostView get(String email, Long id) {
        User me = current(email);
        return view(visiblePost(me, id), me.getId());
    }

    // CREATE POST

    public PostView create(
            String email,
            String content,
            String category,
            String visibility,
            List<MultipartFile> files
    ) {
        User me = current(email);

        String body = text(content, 5000, "Post");

        List<MultipartFile> images = files == null
                ? List.of()
                : files.stream()
                .filter(f -> f != null && !f.isEmpty())
                .toList();

        if (body == null && images.isEmpty()) {
            throw new IllegalArgumentException(
                    "Write something or attach an image."
            );
        }

        if (images.size() > MAX_IMAGES) {
            throw new IllegalArgumentException(
                    "You can attach up to " + MAX_IMAGES + " images."
            );
        }

        if (posts.countByAuthor_IdAndCreatedAtAfter(
                me.getId(), LocalDateTime.now().minusHours(1)
        ) >= 20) {
            throw new IllegalArgumentException(
                    "You have reached the hourly posting limit. Try again later."
            );
        }

        String cat = category(category);
        String vis = visibility(visibility);

        List<String[]> stored = new ArrayList<>();

        try {
            for (MultipartFile file : images) {
                stored.add(storeImage(file));
            }
        } catch (RuntimeException e) {
            stored.forEach(s -> deleteFile(s[0]));
            throw e;
        }

        Post post = new Post();

        post.setAuthor(me);
        post.setContent(body == null ? "" : body);
        post.setCategory(cat);
        post.setVisibility(vis);
        post.setHashtags(hashtags(body));

        post = posts.save(post);

        for (String[] s : stored) {
            PostMedia m = new PostMedia();
            m.setPost(post);
            m.setStoredName(s[0]);
            m.setContentType(s[1]);
            media.save(m);
        }

        notifyMentions(me, post, body);

        return view(post, me.getId());
    }

    // UPDATE POST

    public PostView update(String email, Long id, PostUpdate update) {
        User me = current(email);
        Post post = owned(me, id);

        String body = text(update.content(), 5000, "Post");

        if (body == null &&
                media.findByPost_IdOrderByIdAsc(id).isEmpty()) {
            throw new IllegalArgumentException(
                    "A post needs text or an image."
            );
        }

        post.setContent(body == null ? "" : body);

        if (update.category() != null) {
            post.setCategory(category(update.category()));
        }

        if (update.visibility() != null) {
            post.setVisibility(visibility(update.visibility()));
        }

        post.setHashtags(hashtags(body));
        post.setEditedAt(LocalDateTime.now());

        return view(post, me.getId());
    }

    // DELETE POST

    public void delete(String email, Long id) {
        User me = current(email);
        Post post = owned(me, id);

        List<String> files = media
                .findByPost_IdOrderByIdAsc(id)
                .stream()
                .map(PostMedia::getStoredName)
                .toList();

        comments.deleteRepliesByPost(id);
        comments.deleteTopLevelByPost(id);

        likes.deleteByPost_Id(id);
        saves.deleteByPost_Id(id);
        shares.deleteByPost_Id(id);
        media.deleteByPost_Id(id);

        posts.delete(post);

        files.forEach(this::deleteFile);
    }

    // LIKE

    public PostView toggleLike(String email, Long id) {
        User me = current(email);
        Post post = visiblePost(me, id);

        Optional<PostLike> existing =
                likes.findByPost_IdAndUser_Id(id, me.getId());

        if (existing.isPresent()) {
            likes.delete(existing.get());
        } else {
            PostLike like = new PostLike();
            like.setPost(post);
            like.setUser(me);
            likes.save(like);

            if (!post.getAuthor().getId().equals(me.getId())) {
                notify(
                        post.getAuthor(),
                        me,
                        "POST_LIKE",
                        me.getFullName() + " liked your post.",
                        id
                );
            }
        }

        post.setLikeCount((int) likes.countByPost_Id(id));

        return view(post, me.getId());
    }

    // SAVE

    public PostView toggleSave(String email, Long id) {
        User me = current(email);
        Post post = visiblePost(me, id);

        Optional<SavedPost> existing =
                saves.findByPost_IdAndUser_Id(id, me.getId());

        if (existing.isPresent()) {
            saves.delete(existing.get());
        } else {
            SavedPost saved = new SavedPost();
            saved.setPost(post);
            saved.setUser(me);
            saves.save(saved);
        }

        return view(post, me.getId());
    }

    // SHARE

    public PostView share(String email, Long id) {
        User me = current(email);
        Post post = visiblePost(me, id);

        if (!"PUBLIC".equals(post.getVisibility())) {
            throw new IllegalArgumentException(
                    "Only public posts can be shared."
            );
        }

        if (shares.findByPost_IdAndUser_Id(id, me.getId()).isEmpty()) {
            PostShare share = new PostShare();
            share.setPost(post);
            share.setUser(me);
            shares.save(share);

            post.setShareCount((int) shares.countByPost_Id(id));

            if (!post.getAuthor().getId().equals(me.getId())) {
                notify(
                        post.getAuthor(),
                        me,
                        "POST_SHARE",
                        me.getFullName() + " shared your post.",
                        id
                );
            }
        }

        return view(post, me.getId());
    }

    // REPORT POST

    public void report(String email, Long id, String reason) {
        User me = current(email);
        Post post = visiblePost(me, id);

        if (post.getAuthor().getId().equals(me.getId())) {
            throw new IllegalArgumentException(
                    "You cannot report your own post."
            );
        }

        String detail = clean(reason, 700);

        if (detail == null) {
            throw new IllegalArgumentException(
                    "Please provide a reason for reporting this post."
            );
        }

        if (reports.countByReporter_IdAndCreatedAtAfter(
                me.getId(), LocalDateTime.now().minusDays(1)
        ) >= 10) {
            throw new IllegalArgumentException(
                    "Daily report limit reached."
            );
        }

        CommunityReport report = new CommunityReport();

        report.setReporter(me);
        report.setReported(post.getAuthor());
        report.setReason("Post #" + id + " reported: " + detail);

        reports.save(report);
    }

    // COMMENTS

    @Transactional(readOnly = true)
    public PageView<CommentView> listComments(
            String email, Long postId, int page, int size
    ) {
        User me = current(email);

        visiblePost(me, postId);

        Set<Long> hidden = blockedIds(me.getId());

        Page<PostComment> top =
                comments.findByPost_IdAndParentIsNullOrderByIdAsc(
                        postId,
                        PageRequest.of(
                                Math.max(0, page),
                                Math.max(1, Math.min(size, 30))
                        )
                );

        List<Long> topIds = top.getContent()
                .stream()
                .map(PostComment::getId)
                .toList();

        Map<Long, List<PostComment>> replies = topIds.isEmpty()
                ? Map.of()
                : comments.findByParent_IdInOrderByIdAsc(topIds)
                .stream()
                .collect(Collectors.groupingBy(
                        c -> c.getParent().getId(),
                        LinkedHashMap::new,
                        Collectors.toList()
                ));

        Map<Long, StudentProfile> authors = authorProfiles(
                top.getContent(),
                replies.values().stream()
                        .flatMap(List::stream)
                        .toList()
        );

        List<CommentView> content = top.getContent()
                .stream()
                .filter(c -> !hidden.contains(c.getAuthor().getId()))
                .map(c -> commentView(
                        c,
                        me.getId(),
                        authors,
                        replies.getOrDefault(c.getId(), List.of())
                                .stream()
                                .filter(r -> !hidden.contains(r.getAuthor().getId()))
                                .map(r -> commentView(
                                        r, me.getId(), authors, List.of()
                                ))
                                .toList()
                ))
                .toList();

        return new PageView<>(
                content,
                top.getNumber(),
                top.getSize(),
                top.getTotalElements(),
                top.getTotalPages()
        );
    }

    public CommentResult addComment(
            String email,
            Long postId,
            String content,
            Long parentId
    ) {
        User me = current(email);
        Post post = visiblePost(me, postId);

        String body = text(content, 2000, "Comment");

        if (body == null) {
            throw new IllegalArgumentException("Write a comment first.");
        }

        if (comments.countByAuthor_IdAndCreatedAtAfter(
                me.getId(), LocalDateTime.now().minusMinutes(1)
        ) >= 20) {
            throw new IllegalArgumentException(
                    "Please slow down and try again in a moment."
            );
        }

        PostComment parent = null;

        if (parentId != null) {
            parent = comments.findById(parentId)
                    .filter(c -> c.getPost().getId().equals(postId))
                    .orElseThrow(() ->
                            new EntityNotFoundException("Comment not found.")
                    );

            if (parent.getParent() != null) {
                parent = parent.getParent();
            }
        }

        PostComment comment = new PostComment();

        comment.setPost(post);
        comment.setAuthor(me);
        comment.setParent(parent);
        comment.setContent(body);

        comment = comments.save(comment);

        post.setCommentCount((int) comments.countByPost_Id(postId));

        Long replyRecipient = null;

        if (parent != null &&
                !parent.getAuthor().getId().equals(me.getId())) {

            replyRecipient = parent.getAuthor().getId();

            notify(
                    parent.getAuthor(),
                    me,
                    "POST_REPLY",
                    me.getFullName() + " replied to your comment.",
                    postId
            );
        }

        Long postAuthor = post.getAuthor().getId();

        if (!postAuthor.equals(me.getId()) &&
                !postAuthor.equals(replyRecipient)) {

            notify(
                    post.getAuthor(),
                    me,
                    "POST_COMMENT",
                    me.getFullName() + " commented on your post.",
                    postId
            );
        }

        notifyMentions(me, post, body);

        Map<Long, StudentProfile> authors =
                authorProfiles(List.of(comment), List.of());

        return new CommentResult(
                commentView(comment, me.getId(), authors, List.of()),
                post.getCommentCount()
        );
    }

    public Map<String, Integer> deleteComment(
            String email, Long commentId
    ) {
        User me = current(email);

        PostComment comment = comments.findById(commentId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Comment not found.")
                );

        Post post = comment.getPost();

        boolean allowed =
                comment.getAuthor().getId().equals(me.getId())
                        && canView(post, me.getId());

        if (!allowed) {
            throw new EntityNotFoundException("Comment not found.");
        }

        comments.deleteByParent_Id(commentId);
        comments.delete(comment);
        comments.flush();

        post.setCommentCount(
                (int) comments.countByPost_Id(post.getId())
        );

        return Map.of("commentCount", post.getCommentCount());
    }

    // MEDIA

    @Transactional(readOnly = true)
    public MediaFile mediaFile(String email, Long mediaId) {
        User me = current(email);

        PostMedia item = media.findById(mediaId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Image not found.")
                );

        if (!canView(item.getPost(), me.getId())) {
            throw new EntityNotFoundException("Image not found.");
        }

        Path path = uploadRoot
                .resolve(item.getStoredName())
                .normalize();

        if (!path.startsWith(uploadRoot) ||
                !Files.isRegularFile(path)) {
            throw new EntityNotFoundException("Image not found.");
        }

        return new MediaFile(path, item.getContentType());
    }

    private String[] storeImage(MultipartFile file) {
        if (file.getSize() > MAX_IMAGE_BYTES) {
            throw new IllegalArgumentException(
                    "Each image must be 5 MB or smaller."
            );
        }

        String type = file.getContentType() == null
                ? ""
                : file.getContentType().toLowerCase(Locale.ROOT);

        String ext = IMAGE_TYPES.get(type);

        if (ext == null) {
            throw new IllegalArgumentException(
                    "Only JPEG, PNG, WebP or GIF images are allowed."
            );
        }

        try {
            byte[] data = file.getBytes();

            if (!hasImageSignature(data, ext)) {
                throw new IllegalArgumentException(
                        "That file is not a valid image."
                );
            }

            String name = UUID.randomUUID() + "." + ext;

            Files.write(uploadRoot.resolve(name), data);

            return new String[] { name, type };

        } catch (IOException e) {
            throw new IllegalStateException(
                    "Could not store the uploaded image.", e
            );
        }
    }

    private boolean hasImageSignature(byte[] d, String ext) {
        if (d.length < 12) return false;

        return switch (ext) {
            case "jpg" ->
                    (d[0] & 0xFF) == 0xFF
                            && (d[1] & 0xFF) == 0xD8
                            && (d[2] & 0xFF) == 0xFF;

            case "png" ->
                    (d[0] & 0xFF) == 0x89
                            && d[1] == 'P'
                            && d[2] == 'N'
                            && d[3] == 'G';

            case "gif" ->
                    d[0] == 'G'
                            && d[1] == 'I'
                            && d[2] == 'F'
                            && d[3] == '8';

            case "webp" ->
                    d[0] == 'R'
                            && d[1] == 'I'
                            && d[2] == 'F'
                            && d[3] == 'F'
                            && d[8] == 'W'
                            && d[9] == 'E'
                            && d[10] == 'B'
                            && d[11] == 'P';

            default -> false;
        };
    }

    private void deleteFile(String name) {
        try {
            Files.deleteIfExists(
                    uploadRoot.resolve(name).normalize()
            );
        } catch (IOException ignored) {}
    }

    // HELPERS

    private User current(String email) {
        User user = users.findByEmail(email)
                .orElseThrow(() ->
                        new EntityNotFoundException("Account not found.")
                );

        if (!"STUDENT".equals(user.getRole())) {
            throw new IllegalArgumentException(
                    "Community access is available to student accounts."
            );
        }

        return user;
    }

    private Post visiblePost(User me, Long id) {
        Post post = posts.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Post not found.")
                );

        if (!canView(post, me.getId())) {
            throw new EntityNotFoundException("Post not found.");
        }

        return post;
    }

    private Post owned(User me, Long id) {
        Post post = posts.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Post not found.")
                );

        if (!post.getAuthor().getId().equals(me.getId())) {
            throw new EntityNotFoundException("Post not found.");
        }

        return post;
    }

    private boolean canView(Post post, Long viewerId) {
        Long authorId = post.getAuthor().getId();

        if (authorId.equals(viewerId)) return true;

        String key = pairKey(viewerId, authorId);

        if (blocks.existsByPairKey(key)) return false;

        return switch (post.getVisibility()) {
            case "PUBLIC" -> true;
            case "CONNECTIONS" ->
                    friendships.findByPairKey(key)
                            .map(f -> f.getStatus() == FriendshipStatus.ACCEPTED)
                            .orElse(false);
            default -> false;
        };
    }

    private Set<Long> friendIds(Long userId) {
        return friendships.findAcceptedForUser(
                        userId, FriendshipStatus.ACCEPTED
                ).stream()
                .map(f -> f.getRequester().getId().equals(userId)
                        ? f.getRecipient().getId()
                        : f.getRequester().getId())
                .collect(Collectors.toSet());
    }

    private Set<Long> blockedIds(Long userId) {
        Set<Long> ids = new HashSet<>();

        blocks.findByBlocker_IdOrderByCreatedAtDesc(userId)
                .forEach(b -> ids.add(b.getBlocked().getId()));

        blocks.findByBlocked_Id(userId)
                .forEach(b -> ids.add(b.getBlocker().getId()));

        return ids;
    }

    private Set<Long> withSentinel(Set<Long> ids) {
        Set<Long> copy = new HashSet<>(ids);
        copy.add(-1L);
        return copy;
    }

    private List<PostView> toViews(List<Post> list, Long viewerId) {
        if (list.isEmpty()) return List.of();

        List<Long> ids = list.stream()
                .map(Post::getId)
                .toList();

        Map<Long, List<String>> images =
                media.findByPost_IdInOrderByIdAsc(ids)
                        .stream()
                        .collect(Collectors.groupingBy(
                                m -> m.getPost().getId(),
                                LinkedHashMap::new,
                                Collectors.mapping(
                                        m -> MEDIA_PREFIX + m.getId(),
                                        Collectors.toList()
                                )
                        ));

        Set<Long> liked = new HashSet<>(
                likes.likedAmong(viewerId, ids)
        );

        Set<Long> saved = new HashSet<>(
                saves.savedAmong(viewerId, ids)
        );

        Map<Long, StudentProfile> authors =
                profiles.findAllById(
                                list.stream()
                                        .map(p -> p.getAuthor().getId())
                                        .collect(Collectors.toSet())
                        ).stream()
                        .collect(Collectors.toMap(
                                StudentProfile::getUserId,
                                p -> p
                        ));

        return list.stream()
                .map(p -> new PostView(
                        p.getId(),
                        author(
                                p.getAuthor(),
                                authors.get(p.getAuthor().getId()),
                                viewerId
                        ),
                        p.getContent(),
                        p.getCategory(),
                        p.getVisibility(),
                        tagList(p.getHashtags()),
                        images.getOrDefault(p.getId(), List.of()),
                        p.getLikeCount(),
                        p.getCommentCount(),
                        p.getShareCount(),
                        liked.contains(p.getId()),
                        saved.contains(p.getId()),
                        p.getAuthor().getId().equals(viewerId),
                        p.getEditedAt() != null,
                        p.getCreatedAt()
                ))
                .toList();
    }

    private PostView view(Post post, Long viewerId) {
        return toViews(List.of(post), viewerId).get(0);
    }

    private AuthorView author(
            User user,
            StudentProfile profile,
            Long viewerId
    ) {
        String username = profile == null
                ? "student_" + user.getId()
                : profile.getUsername();

        boolean detail = profile != null &&
                (profile.isDiscoverable() ||
                        user.getId().equals(viewerId));

        return new AuthorView(
                user.getId(),
                username,
                user.getFullName(),
                detail ? profile.getUniversity() : null,
                detail ? profile.getCourse() : null,
                detail ? profile.getCountry() : null
        );
    }

    private Map<Long, StudentProfile> authorProfiles(
            List<PostComment> first,
            List<PostComment> second
    ) {
        Set<Long> ids = new HashSet<>();

        first.forEach(c -> ids.add(c.getAuthor().getId()));
        second.forEach(c -> ids.add(c.getAuthor().getId()));

        return profiles.findAllById(ids)
                .stream()
                .collect(Collectors.toMap(
                        StudentProfile::getUserId,
                        p -> p
                ));
    }

    private CommentView commentView(
            PostComment c,
            Long viewerId,
            Map<Long, StudentProfile> authors,
            List<CommentView> replies
    ) {
        return new CommentView(
                c.getId(),
                c.getParent() == null
                        ? null : c.getParent().getId(),
                author(
                        c.getAuthor(),
                        authors.get(c.getAuthor().getId()),
                        viewerId
                ),
                c.getContent(),
                c.getAuthor().getId().equals(viewerId),
                c.getCreatedAt(),
                replies
        );
    }

    private void notifyMentions(
            User actor, Post post, String body
    ) {
        if (body == null) return;

        Matcher matcher = MENTION.matcher(body);
        Set<String> names = new LinkedHashSet<>();

        while (matcher.find() && names.size() < 10) {
            names.add(matcher.group(1).toLowerCase(Locale.ROOT));
        }

        for (String name : names) {
            profiles.findByUsernameIgnoreCase(name).ifPresent(profile -> {
                User target = profile.getUser();

                if (target.getId().equals(actor.getId()) ||
                        !canView(post, target.getId())) {
                    return;
                }

                notify(
                        target,
                        actor,
                        "MENTION",
                        actor.getFullName() + " mentioned you.",
                        post.getId()
                );
            });
        }
    }

    private void notify(
            User recipient,
            User actor,
            String type,
            String message,
            Long ref
    ) {
        CommunityNotification n = new CommunityNotification();

        n.setRecipient(recipient);
        n.setActor(actor);
        n.setType(type);
        n.setMessage(message);
        n.setReferenceId(ref);

        notifications.save(n);
    }

    private String hashtags(String body) {
        if (body == null) return ",";

        Matcher matcher = HASHTAG.matcher(body);
        Set<String> tags = new LinkedHashSet<>();

        while (matcher.find() && tags.size() < 10) {
            tags.add(matcher.group(1).toLowerCase(Locale.ROOT));
        }

        return tags.isEmpty()
                ? "," : "," + String.join(",", tags) + ",";
    }

    private List<String> tagList(String stored) {
        if (stored == null || stored.isBlank()) return List.of();

        return Arrays.stream(stored.split(","))
                .filter(s -> !s.isBlank())
                .toList();
    }

    private String category(String value) {
        String v = value == null || value.isBlank()
                ? "GENERAL"
                : value.trim().toUpperCase(Locale.ROOT);

        if (!CATEGORIES.contains(v)) {
            throw new IllegalArgumentException(
                    "Choose a valid post category."
            );
        }

        return v;
    }

    private String visibility(String value) {
        String v = value == null || value.isBlank()
                ? "PUBLIC"
                : value.trim().toUpperCase(Locale.ROOT);

        if (!VISIBILITIES.contains(v)) {
            throw new IllegalArgumentException(
                    "Choose public, connections or private visibility."
            );
        }

        return v;
    }

    private String text(
            String value, int max, String label
    ) {
        if (value == null) return null;

        String v = value.trim();

        if (v.isEmpty()) return null;

        if (v.length() > max) {
            throw new IllegalArgumentException(
                    label + " is too long (maximum " + max + " characters)."
            );
        }

        return v;
    }

    private String clean(String value, int max) {
        if (value == null) return null;

        String v = value.trim();

        return v.isEmpty()
                ? null
                : v.substring(0, Math.min(max, v.length()));
    }

    private String pairKey(Long one, Long two) {
        return Math.min(one, two) + ":" + Math.max(one, two);
    }
}