package com.ALL_in_one.community.controller;

import com.ALL_in_one.community.dto.CommunityDtos.PageView;
import com.ALL_in_one.community.dto.CommunityDtos.ProfileUpdate;
import com.ALL_in_one.community.dto.PostDtos.PostView;
import com.ALL_in_one.community.dto.ProfileDtos.PersonCard;
import com.ALL_in_one.community.dto.ProfileDtos.ProfileDetail;
import com.ALL_in_one.community.service.ProfileService;
import java.security.Principal;
import java.time.Duration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/community/profiles")
public class ProfileController {
    private final ProfileService service;
    public ProfileController(ProfileService service) { this.service = service; }

    @GetMapping("/{username}")
    public ProfileDetail detail(Principal principal, @PathVariable String username) { return service.detail(principal.getName(), username); }

    @PutMapping(value = "/me", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ProfileDetail update(Principal principal,
                                @RequestParam(required = false) String displayName, @RequestParam(required = false) String username,
                                @RequestParam(required = false) String bio, @RequestParam(required = false) String university,
                                @RequestParam(required = false) String course, @RequestParam(required = false) String country,
                                @RequestParam(required = false) String interests,
                                @RequestParam(defaultValue = "false") boolean discoverable, @RequestParam(defaultValue = "false") boolean showOnline,
                                @RequestParam(defaultValue = "false") boolean removeAvatar, @RequestParam(defaultValue = "false") boolean removeCover,
                                @RequestParam(value = "avatar", required = false) MultipartFile avatar,
                                @RequestParam(value = "cover", required = false) MultipartFile cover) {
        ProfileUpdate update = new ProfileUpdate(username, bio, university, course, country, interests, discoverable, showOnline);
        return service.updateMe(principal.getName(), displayName, update, avatar, cover, removeAvatar, removeCover);
    }

    @GetMapping("/{username}/posts")
    public PageView<PostView> posts(Principal principal, @PathVariable String username,
                                    @RequestParam(defaultValue = "posts") String tab, @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "12") int size) {
        return service.posts(principal.getName(), username, tab, page, size);
    }

    @GetMapping("/{username}/followers")
    public PageView<PersonCard> followers(Principal principal, @PathVariable String username,
                                          @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
        return service.followers(principal.getName(), username, page, size);
    }

    @GetMapping("/{username}/following")
    public PageView<PersonCard> following(Principal principal, @PathVariable String username,
                                          @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
        return service.following(principal.getName(), username, page, size);
    }

    @PostMapping("/{username}/follow")
    public ProfileDetail follow(Principal principal, @PathVariable String username) { return service.follow(principal.getName(), username); }

    @DeleteMapping("/{username}/follow")
    public ProfileDetail unfollow(Principal principal, @PathVariable String username) { return service.unfollow(principal.getName(), username); }

    @GetMapping("/{username}/avatar") public ResponseEntity<Resource> avatar(Principal principal, @PathVariable String username) { return image(principal, username, true); }
    @GetMapping("/{username}/cover") public ResponseEntity<Resource> cover(Principal principal, @PathVariable String username) { return image(principal, username, false); }

    private ResponseEntity<Resource> image(Principal principal, String username, boolean avatar) {
        ProfileService.MediaFile file = service.media(principal.getName(), username, avatar);
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(file.contentType()))
                .cacheControl(CacheControl.maxAge(Duration.ofHours(6)).cachePrivate())
                .header("X-Content-Type-Options", "nosniff")
                .body(new FileSystemResource(file.path()));
    }
}
