package com.ALL_in_one.studyabroad.dto;

import java.util.List;
import lombok.Data;

@Data
public class SuggestionResponse {

  private String query;
  private List<String> suggestions;
}
