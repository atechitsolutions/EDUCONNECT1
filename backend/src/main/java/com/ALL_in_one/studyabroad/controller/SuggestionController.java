package com.ALL_in_one.studyabroad.controller;

import com.ALL_in_one.studyabroad.dto.SuggestionResponse;
import com.ALL_in_one.studyabroad.service.SuggestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/studyabroad/suggestions")
public class SuggestionController {

    private final SuggestionService suggestionService;


    @GetMapping
    public ResponseEntity<SuggestionResponse> getSuggestions(
            @RequestParam String query) {

        SuggestionResponse response =
                suggestionService.getSuggestions(query);

        return ResponseEntity.ok(response);
    }
}