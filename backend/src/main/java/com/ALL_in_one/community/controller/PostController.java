package com.ALL_in_one.community.controller;

import com.ALL_in_one.community.dto.CommunityDtos.PageView;
import com.ALL_in_one.community.dto.CommunityDtos.ReportMessageRequest;
import com.ALL_in_one.community.dto.PostDtos.*;
import com.ALL_in_one.community.service.PostService;

import jakarta.validation.Valid;
import java.security.Principal;
import java.time.Duration;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/community/posts")
public class PostController {

    private final PostService service;

    public PostController(PostService service) {
        this.service = service;
    }

    @GetMapping
    public PageView<PostView> feed(
            Principal principal,
            @RequestParam(defaultValue = "all") String scope,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "latest") String sort,
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return service.feed(
                principal.getName(), scope, category, sort, q, page, size
        );
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public PostView create(
            Principal principal,
            @RequestParam(required = false) String content,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String visibility,
            @RequestParam(value = "images", required = false)
            List<MultipartFile> images
    ) {
        return service.create(
                principal.getName(), content, category, visibility, images
        );
    }

    @GetMapping("/{id}")
    public PostView get(
            Principal principal,
            @PathVariable Long id
    ) {
        return service.get(principal.getName(), id);
    }

    @PutMapping("/{id}")
    public PostView update(
            Principal principal,
            @PathVariable Long id,
            @Valid @RequestBody PostUpdate body
    ) {
        return service.update(principal.getName(), id, body);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            Principal principal,
            @PathVariable Long id
    ) {
        service.delete(principal.getName(), id);
    }

    @PostMapping("/{id}/like")
    public PostView like(
            Principal principal,
            @PathVariable Long id
    ) {
        return service.toggleLike(principal.getName(), id);
    }

    @PostMapping("/{id}/save")
    public PostView save(
            Principal principal,
            @PathVariable Long id
    ) {
        return service.toggleSave(principal.getName(), id);
    }

    @PostMapping("/{id}/share")
    public PostView share(
            Principal principal,
            @PathVariable Long id
    ) {
        return service.share(principal.getName(), id);
    }

    @PostMapping("/{id}/reports")
    @ResponseStatus(HttpStatus.CREATED)
    public void report(
            Principal principal,
            @PathVariable Long id,
            @Valid @RequestBody ReportMessageRequest body
    ) {
        service.report(principal.getName(), id, body.reason());
    }

    @GetMapping("/{id}/comments")
    public PageView<CommentView> comments(
            Principal principal,
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return service.listComments(
                principal.getName(), id, page, size
        );
    }

    @PostMapping("/{id}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResult addComment(
            Principal principal,
            @PathVariable Long id,
            @Valid @RequestBody CommentRequest body
    ) {
        return service.addComment(
                principal.getName(), id, body.content(), body.parentId()
        );
    }

    @DeleteMapping("/comments/{commentId}")
    public Map<String, Integer> deleteComment(
            Principal principal,
            @PathVariable Long commentId
    ) {
        return service.deleteComment(principal.getName(), commentId);
    }

    @GetMapping("/media/{mediaId}")
    public ResponseEntity<Resource> media(
            Principal principal,
            @PathVariable Long mediaId
    ) {
        PostService.MediaFile file =
                service.mediaFile(principal.getName(), mediaId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(file.contentType()))
                .cacheControl(
                        CacheControl.maxAge(Duration.ofDays(1)).cachePrivate()
                )
                .header("X-Content-Type-Options", "nosniff")
                .body(new FileSystemResource(file.path()));
    }
}