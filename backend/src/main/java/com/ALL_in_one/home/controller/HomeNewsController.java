
package com.ALL_in_one.home.controller;

import com.ALL_in_one.home.dto.HomeNewsRequest;
import com.ALL_in_one.home.dto.HomeNewsResponse;
import com.ALL_in_one.home.service.HomeNewsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/home/news")
public class HomeNewsController {

    private final HomeNewsService homeNewsService;

    public HomeNewsController(HomeNewsService homeNewsService) {
        this.homeNewsService = homeNewsService;
    }

    @GetMapping
    public List<HomeNewsResponse> getPublishedNews() {
        return homeNewsService.getPublishedNews();
    }

    @GetMapping("/{id}")
    public HomeNewsResponse getPublishedNewsById(@PathVariable Long id) {
        return homeNewsService.getPublishedNewsById(id);
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public List<HomeNewsResponse> getAllNews() {
        return homeNewsService.getAllNews();
    }

    @PostMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public HomeNewsResponse create(@Valid @RequestBody HomeNewsRequest request) {
        return homeNewsService.create(request);
    }

    @PutMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public HomeNewsResponse update(@PathVariable Long id,
                                   @Valid @RequestBody HomeNewsRequest request) {
        return homeNewsService.update(id, request);
    }

    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        homeNewsService.delete(id);
    }
}
