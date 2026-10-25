package com.ALL_in_one.onlineeducation.controller;

import com.ALL_in_one.onlineeducation.dto.OnlineEducationCardRequest;
import com.ALL_in_one.onlineeducation.dto.OnlineEducationCardResponse;
import com.ALL_in_one.onlineeducation.dto.OnlineEducationRemovedCardsResponse;
import com.ALL_in_one.onlineeducation.service.OnlineEducationCardService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/online-education/cards")
public class OnlineEducationCardController {

    private final OnlineEducationCardService service;

    public OnlineEducationCardController(OnlineEducationCardService service) {
        this.service = service;
    }

    @GetMapping
    public List<OnlineEducationCardResponse> getActiveCards() {
        return service.getActiveCards();
    }

    @GetMapping("/removed")
    public OnlineEducationRemovedCardsResponse getRemovedCardIds() {
        return new OnlineEducationRemovedCardsResponse(service.getRemovedCardIds());
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN') or @localAdminAccess.isCardEditorPublic()")
    public List<OnlineEducationCardResponse> getAllCards() {
        return service.getAllCards();
    }

    @PostMapping("/admin")
    @PreAuthorize("hasRole('ADMIN') or @localAdminAccess.isCardEditorPublic()")
    @ResponseStatus(HttpStatus.CREATED)
    public OnlineEducationCardResponse create(@Valid @RequestBody OnlineEducationCardRequest request) {
        return service.create(request);
    }

    @PutMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN') or @localAdminAccess.isCardEditorPublic()")
    public OnlineEducationCardResponse update(@PathVariable String id,
                                             @Valid @RequestBody OnlineEducationCardRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN') or @localAdminAccess.isCardEditorPublic()")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
