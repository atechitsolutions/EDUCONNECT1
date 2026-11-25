package com.ALL_in_one.studyabroad.dto;

import java.util.List;
import lombok.Data;

@Data
public class SearchResponse {

  private String query;

  private List<SearchResult> results;

  private int totalResults;
}
