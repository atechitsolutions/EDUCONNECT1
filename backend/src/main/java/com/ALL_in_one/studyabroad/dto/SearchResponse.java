package com.ALL_in_one.studyabroad.dto;


import lombok.Data;

import java.util.List;

@Data
public class SearchResponse {

    private String query;

    private List<SearchResult> results;

    private int totalResults;


}
