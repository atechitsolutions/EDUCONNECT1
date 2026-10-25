package com.ALL_in_one.home.controller;

import com.ALL_in_one.home.dto.HomeUpdateRequest;
import com.ALL_in_one.home.dto.HomeUpdateResponse;
import com.ALL_in_one.home.service.HomeUpdateService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/home/updates")
public class HomeUpdateController {

    private final HomeUpdateService service;

    public HomeUpdateController(HomeUpdateService service) {
        this.service = service;
    }

    @GetMapping("/current-affairs")
    public List<HomeUpdateResponse> getCurrentAffairs() {
        return service.getActiveCurrentAffairs();
    }

    @GetMapping
    public List<HomeUpdateResponse> getActiveUpdates() {
        return service.getActiveUpdates();
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public List<HomeUpdateResponse> getAllUpdates() {
        return service.getAllUpdates();
    }

    @PostMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public HomeUpdateResponse create(@Valid @RequestBody HomeUpdateRequest request) {
        return service.create(request);
    }

    @PutMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public HomeUpdateResponse update(@PathVariable Long id,
                                     @Valid @RequestBody HomeUpdateRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
