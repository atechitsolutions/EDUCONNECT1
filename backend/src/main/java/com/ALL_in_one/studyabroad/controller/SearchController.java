package com.ALL_in_one.studyabroad.controller;

import com.ALL_in_one.studyabroad.dto.SearchRequest;
import com.ALL_in_one.studyabroad.dto.SearchResponse;
import com.ALL_in_one.studyabroad.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/studyabroad/search")
public class SearchController {

    private final SearchService searchService;


    @PostMapping
    public ResponseEntity<SearchResponse> search(
            @RequestBody SearchRequest request) {

        SearchResponse response =
                searchService.search(request);

        return ResponseEntity.ok(response);
    }
}