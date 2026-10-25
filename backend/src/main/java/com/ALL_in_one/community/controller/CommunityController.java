package com.ALL_in_one.community.controller;

import com.ALL_in_one.community.dto.CommunityDtos.*;
import com.ALL_in_one.community.service.CommunityService;
import jakarta.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/community")
public class CommunityController {
    private final CommunityService service;
    public CommunityController(CommunityService service) { this.service = service; }

    @GetMapping("/me/profile") public ProfileView myProfile(Principal principal) { return service.myProfile(principal.getName()); }
    @PutMapping("/me/profile") public ProfileView updateProfile(Principal principal, @Valid @RequestBody ProfileUpdate body) { return service.updateProfile(principal.getName(), body); }
    @PostMapping("/me/presence") @ResponseStatus(HttpStatus.NO_CONTENT) public void heartbeat(Principal principal) { service.heartbeat(principal.getName()); }

    @GetMapping("/students") public PageView<ProfileView> discover(Principal principal,
            @RequestParam(required = false) String q, @RequestParam(required = false) String university,
            @RequestParam(required = false) String course, @RequestParam(required = false) String country,
            @RequestParam(required = false) String interest, @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        return service.discover(principal.getName(), q, university, course, country, interest, page, size);
    }
    @GetMapping("/students/{username}") public ProfileView profile(Principal principal, @PathVariable String username) { return service.profileByUsername(principal.getName(), username); }

    @PostMapping("/friend-requests") @ResponseStatus(HttpStatus.CREATED)
    public RelationshipView sendRequest(Principal principal, @Valid @RequestBody SendRequest body) { return service.sendRequest(principal.getName(), body.userId()); }
    @GetMapping("/friend-requests") public List<RelationshipView> requests(Principal principal, @RequestParam(defaultValue = "incoming") String direction) { return service.requests(principal.getName(), direction); }
    @PatchMapping("/friend-requests/{id}") public RelationshipView respond(Principal principal, @PathVariable Long id, @Valid @RequestBody ActionRequest body) { return service.respond(principal.getName(), id, body.action()); }
    @GetMapping("/friends") public List<RelationshipView> friends(Principal principal) { return service.friends(principal.getName()); }
    @DeleteMapping("/friends/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void removeFriend(Principal principal, @PathVariable Long id) { service.removeFriend(principal.getName(), id); }

    @GetMapping("/conversations") public List<ConversationView> conversations(Principal principal) { return service.conversationList(principal.getName()); }
    @PostMapping("/conversations/{studentId}") @ResponseStatus(HttpStatus.CREATED) public ConversationView openConversation(Principal principal, @PathVariable Long studentId) { return service.openConversation(principal.getName(), studentId); }
    @GetMapping("/conversations/{id}/messages") public List<MessageView> messages(Principal principal, @PathVariable Long id,
            @RequestParam(required = false) Long afterId, @RequestParam(required = false) Long beforeId) {
        return service.getMessages(principal.getName(), id, afterId, beforeId);
    }
    @PostMapping("/conversations/{id}/messages") @ResponseStatus(HttpStatus.CREATED) public MessageView sendMessage(Principal principal, @PathVariable Long id, @Valid @RequestBody MessageRequest body) { return service.sendMessage(principal.getName(), id, body.content()); }

    @GetMapping("/community-chat/messages") public List<CommunityChatMessageView> communityChatMessages(Principal principal,
            @RequestParam(required = false) Long afterId, @RequestParam(required = false) Long beforeId) {
        return service.communityChatMessages(principal.getName(), afterId, beforeId);
    }
    @PostMapping("/community-chat/messages") @ResponseStatus(HttpStatus.CREATED)
    public CommunityChatMessageView sendCommunityChatMessage(Principal principal, @Valid @RequestBody MessageRequest body) {
        return service.sendCommunityChatMessage(principal.getName(), body.content());
    }

    @GetMapping("/notifications") public List<NotificationView> notifications(Principal principal) { return service.notificationList(principal.getName()); }
    @GetMapping("/notifications/unread-count") public Map<String, Long> unreadCount(Principal principal) { return Map.of("count", service.unreadNotifications(principal.getName())); }
    @PatchMapping("/notifications/{id}/read") @ResponseStatus(HttpStatus.NO_CONTENT) public void markRead(Principal principal, @PathVariable Long id) { service.markNotificationRead(principal.getName(), id); }
    @PatchMapping("/notifications/read-all") @ResponseStatus(HttpStatus.NO_CONTENT) public void markAllRead(Principal principal) { service.markAllNotificationsRead(principal.getName()); }

    @PostMapping("/blocks/{studentId}") @ResponseStatus(HttpStatus.NO_CONTENT) public void block(Principal principal, @PathVariable Long studentId) { service.block(principal.getName(), studentId); }
    @DeleteMapping("/blocks/{studentId}") @ResponseStatus(HttpStatus.NO_CONTENT) public void unblock(Principal principal, @PathVariable Long studentId) { service.unblock(principal.getName(), studentId); }
    @PostMapping("/reports") @ResponseStatus(HttpStatus.CREATED) public void report(Principal principal, @Valid @RequestBody ReportRequest body) { service.report(principal.getName(), body.userId(), body.reason()); }
    @GetMapping("/admin/reports") public List<Map<String, Object>> reports(Principal principal) { return service.moderationReports(principal.getName()); }
}
