package com.ALL_in_one.studyabroad.search;


import com.ALL_in_one.studyabroad.enums.InstitutionType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ParsedSearchQuery {

    private String originalQuery;

    private String normalizedQuery;

    private InstitutionType institutionType;

    private String location;

    private String keyword;
}
