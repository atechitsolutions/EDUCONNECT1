package com.ALL_in_one.community.service;

import com.ALL_in_one.community.dto.CommunityDtos.*;
import com.ALL_in_one.community.entity.*;
import com.ALL_in_one.community.repository.*;
import com.ALL_in_one.entity.User;
import com.ALL_in_one.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CommunityService {
    private final UserRepository users;
    private final StudentProfileRepository profiles;
    private final FriendshipRepository friendships;
    private final ConversationRepository conversations;
    private final CommunityMessageRepository messages;
    private final CommunityGroupMessageRepository communityChatMessages;
    private final CommunityNotificationRepository notifications;
    private final UserBlockRepository blocks;
    private final CommunityReportRepository reports;

    public CommunityService(UserRepository users, StudentProfileRepository profiles,
            FriendshipRepository friendships, ConversationRepository conversations,
            CommunityMessageRepository messages, CommunityGroupMessageRepository communityChatMessages, CommunityNotificationRepository notifications,
            UserBlockRepository blocks, CommunityReportRepository reports) {
        this.users = users; this.profiles = profiles; this.friendships = friendships;
        this.conversations = conversations; this.messages = messages; this.communityChatMessages = communityChatMessages; this.notifications = notifications;
        this.blocks = blocks; this.reports = reports;
    }

    private User current(String email) {
        User user = users.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("Account not found."));
        if (!"STUDENT".equals(user.getRole())) throw new IllegalArgumentException("Community access is available to student accounts.");
        return user;
    }

    public ProfileView myProfile(String email) { return view(profile(current(email)), true); }

    public ProfileView updateProfile(String email, ProfileUpdate update) {
        User user = current(email);
        StudentProfile profile = profile(user);
        if (update.username() != null && !update.username().isBlank()) {
            String username = update.username().trim().toLowerCase(Locale.ROOT);
            if (!username.matches("[a-z0-9_]{3,40}")) throw new IllegalArgumentException("Username must be 3–40 characters using letters, numbers or underscores.");
            profiles.findByUsernameIgnoreCase(username).filter(existing -> !existing.getUserId().equals(user.getId()))
                    .ifPresent(existing -> { throw new IllegalArgumentException("That username is already in use."); });
            profile.setUsername(username);
        }
        profile.setBio(clean(update.bio(), 500));
        profile.setUniversity(clean(update.university(), 160));
        profile.setCourse(clean(update.course(), 160));
        profile.setCountry(clean(update.country(), 100));
        profile.setInterests(clean(update.interests(), 500));
        profile.setDiscoverable(update.discoverable());
        profile.setShowOnline(update.showOnline());
        return view(profile, true);
    }

    public void heartbeat(String email) {
        StudentProfile profile = profile(current(email));
        profile.setLastSeenAt(LocalDateTime.now());
    }

    public PageView<ProfileView> discover(String email, String term, String university, String course,
            String country, String interest, int page, int size) {
        User viewer = current(email);
        int safePage = Math.max(0, page), safeSize = Math.max(1, Math.min(size, 40));
        Page<StudentProfile> result = profiles.discover(viewer.getId(), clean(term, 100), clean(university, 160),
                clean(course, 160), clean(country, 100), clean(interest, 100),
                PageRequest.of(safePage, safeSize, Sort.by(Sort.Direction.DESC, "createdAt")));
        Set<Long> hidden = blockedIds(viewer.getId());
        List<ProfileView> content = result.getContent().stream().filter(p -> !hidden.contains(p.getUserId()))
                .map(p -> view(p, false)).toList();
        return new PageView<>(content, result.getNumber(), result.getSize(), result.getTotalElements(), result.getTotalPages());
    }

    public ProfileView profileByUsername(String email, String username) {
        User viewer = current(email);
        StudentProfile profile = profiles.findByUsernameIgnoreCase(username).filter(StudentProfile::isDiscoverable)
                .orElseThrow(() -> new EntityNotFoundException("Student profile not found."));
        if (profile.getUserId().equals(viewer.getId()) || blocked(viewer.getId(), profile.getUserId()))
            throw new EntityNotFoundException("Student profile not found.");
        return view(profile, false);
    }

    public RelationshipView sendRequest(String email, Long targetId) {
        User sender = current(email); User recipient = student(targetId);
        if (sender.getId().equals(targetId)) throw new IllegalArgumentException("You cannot add yourself.");
        if (blocked(sender.getId(), targetId)) throw new IllegalArgumentException("This connection is unavailable.");
        LocalDateTime since = LocalDateTime.now().minusHours(1);
        if (friendships.countByRequester_IdAndCreatedAtAfter(sender.getId(), since) >= 20)
            throw new IllegalArgumentException("You have reached the hourly friend-request limit. Try again later.");
        String key = pairKey(sender.getId(), targetId);
        Friendship friendship = friendships.findByPairKey(key).orElseGet(Friendship::new);
        if (friendship.getStatus() == FriendshipStatus.ACCEPTED) throw new IllegalArgumentException("You are already connected.");
        if (friendship.getStatus() == FriendshipStatus.PENDING) {
            if (friendship.getRequester().getId().equals(sender.getId())) throw new IllegalArgumentException("A request is already pending.");
            throw new IllegalArgumentException("This student has already sent you a request. Accept it from Requests.");
        }
        friendship.setRequester(sender); friendship.setRecipient(recipient); friendship.setPairKey(key); friendship.setStatus(FriendshipStatus.PENDING);
        friendship = friendships.save(friendship);
        notify(recipient, sender, "FRIEND_REQUEST", sender.getFullName() + " sent you a friend request.", friendship.getId());
        return relationship(friendship, recipient.getId());
    }

    public RelationshipView respond(String email, Long requestId, String action) {
        User actor = current(email);
        Friendship f = friendships.findById(requestId).orElseThrow(() -> new EntityNotFoundException("Friend request not found."));
        String normalized = action == null ? "" : action.trim().toLowerCase(Locale.ROOT);
        if ("cancel".equals(normalized)) {
            if (!f.getRequester().getId().equals(actor.getId()) || f.getStatus() != FriendshipStatus.PENDING) throw new IllegalArgumentException("You cannot cancel this request.");
            friendships.delete(f); return null;
        }
        if (!f.getRecipient().getId().equals(actor.getId()) || f.getStatus() != FriendshipStatus.PENDING) throw new IllegalArgumentException("This request is no longer available.");
        if ("accept".equals(normalized)) {
            f.setStatus(FriendshipStatus.ACCEPTED);
            notify(f.getRequester(), actor, "FRIEND_ACCEPTED", actor.getFullName() + " accepted your friend request.", f.getId());
        } else if ("reject".equals(normalized)) {
            f.setStatus(FriendshipStatus.REJECTED);
        } else throw new IllegalArgumentException("Choose accept, reject or cancel.");
        return relationship(f, actor.getId());
    }

    public List<RelationshipView> requests(String email, String direction) {
        User user = current(email);
        if ("outgoing".equalsIgnoreCase(direction)) return friendships.findByRequester_IdAndStatusOrderByCreatedAtDesc(user.getId(), FriendshipStatus.PENDING).stream().map(f -> relationship(f, user.getId())).toList();
        return friendships.findByRecipient_IdAndStatusOrderByCreatedAtDesc(user.getId(), FriendshipStatus.PENDING).stream().map(f -> relationship(f, user.getId())).toList();
    }

    public List<RelationshipView> friends(String email) {
        User user = current(email); Set<Long> hidden = blockedIds(user.getId());
        return friendships.findAcceptedForUser(user.getId(), FriendshipStatus.ACCEPTED).stream().filter(f -> !hidden.contains(other(f, user.getId()).getId()))
                .map(f -> relationship(f, user.getId())).toList();
    }

    public void removeFriend(String email, Long friendshipId) {
        User user = current(email);
        Friendship f = friendships.findById(friendshipId).orElseThrow(() -> new EntityNotFoundException("Connection not found."));
        if (f.getStatus() != FriendshipStatus.ACCEPTED || (!f.getRequester().getId().equals(user.getId()) && !f.getRecipient().getId().equals(user.getId())))
            throw new EntityNotFoundException("Connection not found.");
        friendships.delete(f);
    }

    public ConversationView openConversation(String email, Long peerId) {
        User user = current(email); User peer = student(peerId); assertFriends(user.getId(), peerId);
        String key = pairKey(user.getId(), peerId);
        Conversation conversation = conversations.findByPairKey(key).orElseGet(() -> {
            Conversation c = new Conversation(); c.setPairKey(key);
            if (user.getId() < peerId) { c.setParticipantOne(user); c.setParticipantTwo(peer); }
            else { c.setParticipantOne(peer); c.setParticipantTwo(user); }
            return conversations.save(c);
        });
        return conversationView(conversation, user.getId());
    }

    public List<ConversationView> conversationList(String email) {
        User user = current(email);
        return conversations.findAllForUser(user.getId()).stream().filter(c -> !blocked(user.getId(), peer(c, user.getId()).getId()))
                .map(c -> conversationView(c, user.getId())).toList();
    }

    public List<MessageView> getMessages(String email, Long conversationId, Long afterId, Long beforeId) {
        User user = current(email); Conversation c = authorizedConversation(user.getId(), conversationId);
        messages.markReceivedRead(conversationId, user.getId(), LocalDateTime.now());
        List<CommunityMessage> found;
        if (beforeId != null && beforeId > 0) {
            found = messages.findByConversation_IdAndIdLessThanOrderByIdDesc(conversationId, beforeId, PageRequest.of(0, 60));
            Collections.reverse(found);
        }
        else if (afterId != null && afterId > 0) found = messages.findByConversation_IdAndIdGreaterThanOrderByIdAsc(conversationId, afterId, PageRequest.of(0, 100));
        else { found = messages.latest(conversationId, PageRequest.of(0, 60)); Collections.reverse(found); }
        return found.stream().map(this::messageView).toList();
    }

    public MessageView sendMessage(String email, Long conversationId, String content) {
        User sender = current(email); Conversation c = authorizedConversation(sender.getId(), conversationId);
        String body = content == null ? "" : content.trim();
        if (body.isEmpty() || body.length() > 4000) throw new IllegalArgumentException("Message must be between 1 and 4,000 characters.");
        if (messages.countBySender_IdAndCreatedAtAfter(sender.getId(), LocalDateTime.now().minusMinutes(1)) >= 40)
            throw new IllegalArgumentException("Please slow down and try again in a moment.");
        CommunityMessage message = new CommunityMessage(); message.setConversation(c); message.setSender(sender); message.setContent(body);
        message = messages.save(message); c.setUpdatedAt(LocalDateTime.now());
        User recipient = peer(c, sender.getId());
        notify(recipient, sender, "MESSAGE", "New message from " + sender.getFullName() + ".", c.getId());
        return messageView(message);
    }

    public List<CommunityChatMessageView> communityChatMessages(String email, Long afterId, Long beforeId) {
        authenticatedUser(email);
        List<CommunityGroupMessage> found;
        if (beforeId != null && beforeId > 0) {
            found = communityChatMessages.findByIdLessThanOrderByIdDesc(beforeId, PageRequest.of(0, 60));
            Collections.reverse(found);
        } else if (afterId != null && afterId > 0) {
            found = communityChatMessages.findByIdGreaterThanOrderByIdAsc(afterId, PageRequest.of(0, 100));
        } else {
            found = communityChatMessages.findTop100ByOrderByIdDesc();
            Collections.reverse(found);
        }
        return found.stream().map(this::communityChatMessageView).toList();
    }

    public CommunityChatMessageView sendCommunityChatMessage(String email, String content) {
        User sender = authenticatedUser(email);
        String body = content == null ? "" : content.trim();
        if (body.isEmpty() || body.length() > 4000) throw new IllegalArgumentException("Message must be between 1 and 4,000 characters.");
        if (communityChatMessages.countBySender_IdAndCreatedAtAfter(sender.getId(), LocalDateTime.now().minusMinutes(1)) >= 40)
            throw new IllegalArgumentException("Please slow down and try again in a moment.");
        CommunityGroupMessage message = new CommunityGroupMessage();
        message.setSender(sender);
        message.setContent(body);
        return communityChatMessageView(communityChatMessages.save(message));
    }

    private User authenticatedUser(String email) {
        return users.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("Account not found."));
    }

    private CommunityChatMessageView communityChatMessageView(CommunityGroupMessage message) {
        return new CommunityChatMessageView(message.getId(), message.getSender().getId(), message.getSender().getFullName(), message.getContent(), message.getCreatedAt());
    }

    public List<NotificationView> notificationList(String email) {
        User user = current(email);
        return notifications.findByRecipient_IdOrderByCreatedAtDesc(user.getId(), PageRequest.of(0, 50)).stream().map(n ->
                new NotificationView(n.getId(), n.getType(), n.getMessage(), n.getReferenceId(),
                        n.getActor() == null ? null : profile(n.getActor()).getUsername(),
                        n.getActor() == null ? null : n.getActor().getFullName(), n.getCreatedAt(), n.getReadAt() != null)).toList();
    }

    public long unreadNotifications(String email) { return notifications.countByRecipient_IdAndReadAtIsNull(current(email).getId()); }
    public void markNotificationRead(String email, Long id) { notifications.markRead(id, current(email).getId()); }
    public void markAllNotificationsRead(String email) { notifications.markAllRead(current(email).getId()); }

    public void block(String email, Long targetId) {
        User user = current(email); User target = student(targetId);
        if (user.getId().equals(targetId)) throw new IllegalArgumentException("You cannot block yourself.");
        String key = pairKey(user.getId(), targetId);
        if (blocks.existsByPairKey(key)) return;
        UserBlock b = new UserBlock(); b.setBlocker(user); b.setBlocked(target); b.setPairKey(key); blocks.save(b);
        friendships.deleteByPairKey(key);
    }

    public void unblock(String email, Long targetId) { User user = current(email); blocks.deleteByPairKeyAndBlocker_Id(pairKey(user.getId(), targetId), user.getId()); }

    public void report(String email, Long targetId, String reason) {
        User user = current(email); User target = student(targetId);
        if (user.getId().equals(targetId)) throw new IllegalArgumentException("You cannot report your own account.");
        if (reports.countByReporter_IdAndCreatedAtAfter(user.getId(), LocalDateTime.now().minusDays(1)) >= 10)
            throw new IllegalArgumentException("Daily report limit reached.");
        String details = clean(reason, 1000);
        if (details == null || details.isBlank()) throw new IllegalArgumentException("Please provide a report reason.");
        CommunityReport report = new CommunityReport(); report.setReporter(user); report.setReported(target); report.setReason(details); reports.save(report);
    }

    public List<Map<String, Object>> moderationReports(String email) {
        User admin = users.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("Account not found."));
        if (!"ADMIN".equals(admin.getRole())) throw new IllegalArgumentException("Administrator access required.");
        return reports.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream().limit(200).map(r -> Map.<String, Object>of(
                "id", r.getId(), "reporterId", r.getReporter().getId(), "reportedId", r.getReported().getId(),
                "reason", r.getReason(), "status", r.getStatus(), "createdAt", r.getCreatedAt())).toList();
    }

    private StudentProfile profile(User user) {
        return profiles.findById(user.getId()).orElseGet(() -> {
            StudentProfile p = new StudentProfile(); p.setUser(user); p.setUsername("student_" + user.getId()); return profiles.save(p);
        });
    }

    private ProfileView view(StudentProfile p, boolean own) {
        boolean online = p.isShowOnline() && p.getLastSeenAt() != null && p.getLastSeenAt().isAfter(LocalDateTime.now().minusMinutes(2));
        List<String> interests = p.getInterests() == null || p.getInterests().isBlank() ? List.of() : Arrays.stream(p.getInterests().split(","))
                .map(String::trim).filter(s -> !s.isEmpty()).limit(12).toList();
        return new ProfileView(p.getUserId(), p.getUsername(), p.getUser().getFullName(), p.getBio(), p.getUniversity(),
                p.getCourse(), p.getCountry(), interests, own && p.isDiscoverable(), own && p.isShowOnline(), online, p.getCreatedAt());
    }

    private RelationshipView relationship(Friendship f, Long viewerId) {
        User student = f.getRequester().getId().equals(viewerId) ? f.getRecipient() : f.getRequester();
        String direction = f.getRecipient().getId().equals(viewerId) ? "incoming" : "outgoing";
        return new RelationshipView(f.getId(), view(profile(student), false), f.getStatus().name(), direction, f.getCreatedAt());
    }

    private ConversationView conversationView(Conversation c, Long viewerId) {
        User peer = peer(c, viewerId);
        CommunityMessage last = messages.latest(c.getId(), PageRequest.of(0, 1)).stream().findFirst().orElse(null);
        return new ConversationView(c.getId(), view(profile(peer), false), last == null ? "Start a conversation" : last.getContent(),
                last == null ? c.getUpdatedAt() : last.getCreatedAt(), messages.countByConversation_IdAndSender_IdNotAndReadAtIsNull(c.getId(), viewerId));
    }

    private MessageView messageView(CommunityMessage m) { return new MessageView(m.getId(), m.getSender().getId(), m.getContent(), m.getCreatedAt(), m.getReadAt()); }
    private Conversation authorizedConversation(Long userId, Long id) {
        Conversation c = conversations.findById(id).orElseThrow(() -> new EntityNotFoundException("Conversation not found."));
        if (!c.getParticipantOne().getId().equals(userId) && !c.getParticipantTwo().getId().equals(userId)) throw new EntityNotFoundException("Conversation not found.");
        if (blocked(userId, peer(c, userId).getId())) throw new EntityNotFoundException("Conversation not found.");
        return c;
    }
    private void assertFriends(Long one, Long two) {
        if (blocked(one, two)) throw new IllegalArgumentException("This connection is unavailable.");
        Friendship f = friendships.findByPairKey(pairKey(one, two)).orElseThrow(() -> new IllegalArgumentException("Send and accept a friend request before messaging."));
        if (f.getStatus() != FriendshipStatus.ACCEPTED) throw new IllegalArgumentException("Send and accept a friend request before messaging.");
    }
    private User student(Long id) {
        User user = users.findById(id).orElseThrow(() -> new EntityNotFoundException("Student not found."));
        if (!"STUDENT".equals(user.getRole())) throw new EntityNotFoundException("Student not found.");
        return user;
    }
    private void notify(User recipient, User actor, String type, String body, Long ref) {
        CommunityNotification n = new CommunityNotification(); n.setRecipient(recipient); n.setActor(actor); n.setType(type); n.setMessage(body); n.setReferenceId(ref); notifications.save(n);
    }
    private Set<Long> blockedIds(Long userId) {
        Set<Long> ids = new HashSet<>();
        blocks.findByBlocker_IdOrderByCreatedAtDesc(userId).forEach(b -> ids.add(b.getBlocked().getId()));
        blocks.findByBlocked_Id(userId).forEach(b -> ids.add(b.getBlocker().getId()));
        return ids;
    }
    private boolean blocked(Long one, Long two) { return blocks.existsByPairKey(pairKey(one, two)); }
    private User other(Friendship f, Long id) { return f.getRequester().getId().equals(id) ? f.getRecipient() : f.getRequester(); }
    private User peer(Conversation c, Long id) { return c.getParticipantOne().getId().equals(id) ? c.getParticipantTwo() : c.getParticipantOne(); }
    private String pairKey(Long one, Long two) { return Math.min(one, two) + ":" + Math.max(one, two); }
    private String clean(String value, int max) { if (value == null) return null; String v = value.trim(); return v.isEmpty() ? null : v.substring(0, Math.min(max, v.length())); }
}
