package com.ALL_in_one.studyabroad.dto;


import lombok.Data;

import java.util.List;

@Data
public class SuggestionResponse {

    private String query;
    private List<String>  suggestions;
}
