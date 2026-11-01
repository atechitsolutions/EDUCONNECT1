package com.ALL_in_one.community.service;

import com.ALL_in_one.community.dto.CommunityDtos.PageView;
import com.ALL_in_one.community.dto.CommunityDtos.ProfileUpdate;
import com.ALL_in_one.community.dto.PostDtos.PostView;
import com.ALL_in_one.community.dto.ProfileDtos.PersonCard;
import com.ALL_in_one.community.dto.ProfileDtos.ProfileDetail;
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
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class ProfileService {
    private static final Map<String, String> IMAGE_TYPES = Map.of("image/jpeg", "jpg", "image/png", "png", "image/webp", "webp");
    private static final long MAX_IMAGE_BYTES = 5L * 1024 * 1024;

    public record MediaFile(Path path, String contentType) {}

    private final UserRepository users;
    private final StudentProfileRepository profiles;
    private final FriendshipRepository friendships;
    private final UserBlockRepository blocks;
    private final FollowRepository follows;
    private final ProfileMediaRepository mediaRepo;
    private final CommunityNotificationRepository notifications;
    private final CommunityService community;
    private final PostService postService;
    private final Path mediaRoot;

    public ProfileService(UserRepository users, StudentProfileRepository profiles, FriendshipRepository friendships,
                          UserBlockRepository blocks, FollowRepository follows, ProfileMediaRepository mediaRepo,
                          CommunityNotificationRepository notifications, CommunityService community, PostService postService,
                          @Value("${app.community.upload-dir:uploads/community}") String uploadDir) {
        this.users = users; this.profiles = profiles; this.friendships = friendships; this.blocks = blocks;
        this.follows = follows; this.mediaRepo = mediaRepo; this.notifications = notifications;
        this.community = community; this.postService = postService;
        this.mediaRoot = Path.of(uploadDir, "profile").toAbsolutePath().normalize();
        try { Files.createDirectories(this.mediaRoot); }
        catch (IOException e) { throw new IllegalStateException("Cannot create profile upload directory " + this.mediaRoot, e); }
    }

    // ---------------------------------------------------------------- reading

    public ProfileDetail detail(String email, String username) {
        User viewer = current(email);
        StudentProfile target = "me".equalsIgnoreCase(username) ? ensureProfile(viewer) : visibleProfile(viewer, username);
        return buildDetail(viewer, target);
    }

    @Transactional(readOnly = true)
    public PageView<PostView> posts(String email, String username, String tab, int page, int size) {
        User viewer = current(email);
        StudentProfile target = "me".equalsIgnoreCase(username) ? ensureProfile(viewer) : visibleProfile(viewer, username);
        return postService.userPosts(email, target.getUserId(), tab, page, size);
    }

    @Transactional(readOnly = true)
    public PageView<PersonCard> followers(String email, String username, int page, int size) {
        User viewer = current(email);
        StudentProfile target = "me".equalsIgnoreCase(username) ? ensureProfile(viewer) : visibleProfile(viewer, username);
        Page<Follow> result = follows.findByFollowing_IdOrderByIdDesc(target.getUserId(), pageRequest(page, size));
        return cards(viewer, result, result.getContent().stream().map(Follow::getFollower).toList());
    }

    @Transactional(readOnly = true)
    public PageView<PersonCard> following(String email, String username, int page, int size) {
        User viewer = current(email);
        StudentProfile target = "me".equalsIgnoreCase(username) ? ensureProfile(viewer) : visibleProfile(viewer, username);
        Page<Follow> result = follows.findByFollower_IdOrderByIdDesc(target.getUserId(), pageRequest(page, size));
        return cards(viewer, result, result.getContent().stream().map(Follow::getFollowing).toList());
    }

    // --------------------------------------------------------------- following

    public ProfileDetail follow(String email, String username) {
        User viewer = current(email);
        StudentProfile target = visibleProfile(viewer, username);
        if (target.getUserId().equals(viewer.getId())) throw new IllegalArgumentException("You cannot follow yourself.");
        if (!follows.existsByFollower_IdAndFollowing_Id(viewer.getId(), target.getUserId())) {
            if (follows.countByFollower_IdAndCreatedAtAfter(viewer.getId(), LocalDateTime.now().minusHours(1)) >= 60)
                throw new IllegalArgumentException("You are following people too quickly. Please try again later.");
            Follow follow = new Follow();
            follow.setFollower(viewer); follow.setFollowing(target.getUser());
            try {
                follows.saveAndFlush(follow);
                CommunityNotification n = new CommunityNotification();
                n.setRecipient(target.getUser()); n.setActor(viewer); n.setType("FOLLOW");
                n.setMessage(viewer.getFullName() + " started following you."); n.setReferenceId(viewer.getId());
                notifications.save(n);
            } catch (DataIntegrityViolationException duplicate) {
                // Already following (double click or race): the unique constraint keeps counts accurate.
            }
        }
        return buildDetail(viewer, target);
    }

    public ProfileDetail unfollow(String email, String username) {
        User viewer = current(email);
        StudentProfile target = profiles.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new EntityNotFoundException("Student profile not found."));
        follows.findByFollower_IdAndFollowing_Id(viewer.getId(), target.getUserId()).ifPresent(follows::delete);
        follows.flush();
        return buildDetail(viewer, target);
    }

    // ---------------------------------------------------------------- editing

    public ProfileDetail updateMe(String email, String displayName, ProfileUpdate update,
                                  MultipartFile avatar, MultipartFile cover, boolean removeAvatar, boolean removeCover) {
        User me = current(email);
        ensureProfile(me);
        if (displayName != null && !displayName.isBlank()) {
            String name = displayName.trim().replaceAll("\\s+", " ");
            if (name.length() < 2 || name.length() > 80) throw new IllegalArgumentException("Display name must be 2–80 characters.");
            me.setFullName(name);
            users.save(me);
        }
        community.updateProfile(email, update);

        boolean hasAvatar = avatar != null && !avatar.isEmpty();
        boolean hasCover = cover != null && !cover.isEmpty();
        if (hasAvatar || hasCover || removeAvatar || removeCover) {
            ProfileMedia media = mediaRepo.findById(me.getId()).orElseGet(() -> new ProfileMedia(me.getId()));
            if (hasAvatar) {
                String[] stored = storeImage(avatar);
                deleteFile(media.getAvatarFile());
                media.setAvatarFile(stored[0]); media.setAvatarType(stored[1]);
            } else if (removeAvatar) {
                deleteFile(media.getAvatarFile()); media.setAvatarFile(null); media.setAvatarType(null);
            }
            if (hasCover) {
                String[] stored = storeImage(cover);
                deleteFile(media.getCoverFile());
                media.setCoverFile(stored[0]); media.setCoverType(stored[1]);
            } else if (removeCover) {
                deleteFile(media.getCoverFile()); media.setCoverFile(null); media.setCoverType(null);
            }
            media.touch();
            mediaRepo.save(media);
        }
        return buildDetail(me, ensureProfile(me));
    }

    // ------------------------------------------------------------------ media

    @Transactional(readOnly = true)
    public MediaFile media(String email, String username, boolean avatar) {
        User viewer = current(email);
        StudentProfile target = "me".equalsIgnoreCase(username) ? ensureProfile(viewer) : visibleProfile(viewer, username);
        ProfileMedia media = mediaRepo.findById(target.getUserId()).orElseThrow(() -> new EntityNotFoundException("Image not found."));
        String file = avatar ? media.getAvatarFile() : media.getCoverFile();
        String type = avatar ? media.getAvatarType() : media.getCoverType();
        if (file == null || type == null) throw new EntityNotFoundException("Image not found.");
        Path path = mediaRoot.resolve(file).normalize();
        if (!path.startsWith(mediaRoot) || !Files.isRegularFile(path)) throw new EntityNotFoundException("Image not found.");
        return new MediaFile(path, type);
    }

    // ---------------------------------------------------------------- helpers

    private User current(String email) {
        User user = users.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("Account not found."));
        if (!"STUDENT".equals(user.getRole())) throw new IllegalArgumentException("Community access is available to student accounts.");
        return user;
    }

    private StudentProfile ensureProfile(User user) {
        return profiles.findById(user.getId()).orElseGet(() -> {
            StudentProfile p = new StudentProfile();
            p.setUser(user); p.setUsername("student_" + user.getId());
            return profiles.save(p);
        });
    }

    /** A profile can be opened by its owner, by friends, or by anyone when the student is discoverable. */
    private StudentProfile visibleProfile(User viewer, String username) {
        StudentProfile target = profiles.findByUsernameIgnoreCase(username == null ? "" : username.trim())
                .orElseThrow(() -> new EntityNotFoundException("Student profile not found."));
        if (target.getUserId().equals(viewer.getId())) return target;
        String key = pairKey(viewer.getId(), target.getUserId());
        if (blocks.existsByPairKey(key)) throw new EntityNotFoundException("Student profile not found.");
        boolean friend = friendships.findByPairKey(key).map(f -> f.getStatus() == FriendshipStatus.ACCEPTED).orElse(false);
        if (!target.isDiscoverable() && !friend) throw new EntityNotFoundException("Student profile not found.");
        return target;
    }

    private ProfileDetail buildDetail(User viewer, StudentProfile p) {
        boolean me = p.getUserId().equals(viewer.getId());
        String friendStatus = "NONE"; Long friendshipId = null;
        if (!me) {
            Optional<Friendship> friendship = friendships.findByPairKey(pairKey(viewer.getId(), p.getUserId()));
            if (friendship.isPresent()) {
                Friendship f = friendship.get();
                friendshipId = f.getId();
                if (f.getStatus() == FriendshipStatus.ACCEPTED) friendStatus = "FRIEND";
                else if (f.getStatus() == FriendshipStatus.PENDING)
                    friendStatus = f.getRequester().getId().equals(viewer.getId()) ? "OUTGOING" : "INCOMING";
            }
        }
        boolean online = p.isShowOnline() && p.getLastSeenAt() != null && p.getLastSeenAt().isAfter(LocalDateTime.now().minusMinutes(2));
        List<String> interests = p.getInterests() == null || p.getInterests().isBlank() ? List.of()
                : Arrays.stream(p.getInterests().split(",")).map(String::trim).filter(s -> !s.isEmpty()).limit(12).toList();
        ProfileMedia media = mediaRepo.findById(p.getUserId()).orElse(null);
        return new ProfileDetail(p.getUserId(), p.getUsername(), p.getUser().getFullName(), p.getBio(), p.getUniversity(),
                p.getCourse(), p.getCountry(), interests, me, online, me && p.isDiscoverable(), me && p.isShowOnline(),
                friendStatus, friendshipId,
                !me && follows.existsByFollower_IdAndFollowing_Id(viewer.getId(), p.getUserId()),
                !me && follows.existsByFollower_IdAndFollowing_Id(p.getUserId(), viewer.getId()),
                postService.countVisiblePosts(viewer.getId(), p.getUserId()),
                follows.countByFollowing_Id(p.getUserId()), follows.countByFollower_Id(p.getUserId()),
                mediaUrl(p.getUsername(), "avatar", media == null || media.getAvatarFile() == null ? null : media),
                mediaUrl(p.getUsername(), "cover", media == null || media.getCoverFile() == null ? null : media),
                p.getCreatedAt());
    }

    private String mediaUrl(String username, String kind, ProfileMedia media) {
        return media == null ? null : "/profiles/" + username + "/" + kind + "?v=" + media.getVersion();
    }

    private PageView<PersonCard> cards(User viewer, Page<Follow> page, List<User> people) {
        List<Long> ids = people.stream().map(User::getId).toList();
        Map<Long, StudentProfile> byId = ids.isEmpty() ? Map.of() : profiles.findAllById(ids).stream()
                .collect(Collectors.toMap(StudentProfile::getUserId, p -> p));
        Map<Long, ProfileMedia> media = ids.isEmpty() ? Map.of() : mediaRepo.findAllById(ids).stream()
                .collect(Collectors.toMap(ProfileMedia::getUserId, m -> m));
        Set<Long> following = ids.isEmpty() ? Set.of() : new HashSet<>(follows.followingAmong(viewer.getId(), ids));
        Set<Long> followers = ids.isEmpty() ? Set.of() : new HashSet<>(follows.followersAmong(viewer.getId(), ids));
        List<PersonCard> content = new ArrayList<>();
        for (User person : people) {
            StudentProfile p = byId.get(person.getId());
            if (p == null) continue;
            boolean me = person.getId().equals(viewer.getId());
            boolean related = following.contains(person.getId()) || followers.contains(person.getId());
            boolean blocked = !me && blocks.existsByPairKey(pairKey(viewer.getId(), person.getId()));
            // Respect discovery settings: hidden students only appear to people they are connected with.
            if (blocked || (!me && !p.isDiscoverable() && !related)) continue;
            ProfileMedia m = media.get(person.getId());
            content.add(new PersonCard(person.getId(), p.getUsername(), person.getFullName(), p.getBio(),
                    mediaUrl(p.getUsername(), "avatar", m == null || m.getAvatarFile() == null ? null : m),
                    me, following.contains(person.getId()), followers.contains(person.getId())));
        }
        return new PageView<>(content, page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages());
    }

    private String[] storeImage(MultipartFile file) {
        if (file.getSize() > MAX_IMAGE_BYTES) throw new IllegalArgumentException("Profile images must be 5 MB or smaller.");
        String type = file.getContentType() == null ? "" : file.getContentType().toLowerCase(Locale.ROOT);
        String ext = IMAGE_TYPES.get(type);
        if (ext == null) throw new IllegalArgumentException("Profile images must be JPEG, PNG or WebP.");
        try {
            byte[] d = file.getBytes();
            boolean valid = d.length >= 12 && switch (ext) {
                case "jpg" -> (d[0] & 0xFF) == 0xFF && (d[1] & 0xFF) == 0xD8 && (d[2] & 0xFF) == 0xFF;
                case "png" -> (d[0] & 0xFF) == 0x89 && d[1] == 'P' && d[2] == 'N' && d[3] == 'G';
                default -> d[0] == 'R' && d[1] == 'I' && d[2] == 'F' && d[3] == 'F' && d[8] == 'W' && d[9] == 'E' && d[10] == 'B' && d[11] == 'P';
            };
            if (!valid) throw new IllegalArgumentException("That file is not a valid image.");
            String name = UUID.randomUUID() + "." + ext;
            Files.write(mediaRoot.resolve(name), d);
            return new String[] { name, type };
        } catch (IOException e) {
            throw new IllegalStateException("Could not store the uploaded image.", e);
        }
    }

    private void deleteFile(String name) {
        if (name == null) return;
        try { Files.deleteIfExists(mediaRoot.resolve(name).normalize()); } catch (IOException ignored) { }
    }

    private PageRequest pageRequest(int page, int size) { return PageRequest.of(Math.max(0, page), Math.max(1, Math.min(size, 50))); }
    private String pairKey(Long one, Long two) { return Math.min(one, two) + ":" + Math.max(one, two); }
}
