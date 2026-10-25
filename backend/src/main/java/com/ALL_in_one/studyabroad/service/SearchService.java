package com.ALL_in_one.studyabroad.service;

import com.ALL_in_one.studyabroad.dto.SearchRequest;
import com.ALL_in_one.studyabroad.dto.SearchResponse;
import com.ALL_in_one.studyabroad.dto.SearchResult;
import com.ALL_in_one.studyabroad.entity.Institution;
import com.ALL_in_one.studyabroad.enums.InstitutionType;
import com.ALL_in_one.studyabroad.repository.InstitutionSearchRepository;
import com.ALL_in_one.studyabroad.search.ParsedSearchQuery;
import com.ALL_in_one.studyabroad.search.QueryParserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SearchService {

    private static final int MAX_SEARCH_RESULTS = 50;

    private final QueryParserService queryParserService;

    private final InstitutionSearchRepository institutionSearchRepository;


    public SearchResponse search(SearchRequest request) {

        String query =
                request == null || request.getQuery() == null
                        ? ""
                        : request.getQuery().trim();


        SearchResponse response =
                new SearchResponse();

        response.setQuery(query);


        if (query.isBlank()) {

            response.setResults(List.of());

            response.setTotalResults(0);

            return response;
        }


        ParsedSearchQuery parsedQuery =
                queryParserService.parseQuery(query);


        List<Institution> institutions =
                findInstitutions(parsedQuery);


        List<SearchResult> results =
                institutions.stream()
                        .map(this::toSearchResult)
                        .toList();


        response.setResults(results);

        response.setTotalResults(results.size());

        return response;
    }


    private List<Institution> findInstitutions(
            ParsedSearchQuery parsedQuery) {

        InstitutionType requestedType =
                parsedQuery.getInstitutionType();

        String location =
                parsedQuery.getLocation();

        String keyword =
                parsedQuery.getKeyword();


        PageRequest pageRequest =
                PageRequest.of(
                        0,
                        MAX_SEARCH_RESULTS
                );


        /*
         * CASE 1:
         *
         * Location is present.
         *
         * Example:
         * "universities in Toronto"
         *
         * Location is the hard filter.
         * Requested institution type is used
         * as a preference.
         */
        if (location != null) {

            String safeKeyword =
                    keyword == null ? "" : keyword;


            if (requestedType != null) {

                List<Institution> preferredInstitutions =
                        institutionSearchRepository
                                .searchActiveInstitutionsByTypeAndLocation(
                                        requestedType,
                                        location,
                                        safeKeyword,
                                        pageRequest
                                );


                List<Institution> allInstitutions =
                        institutionSearchRepository
                                .searchActiveInstitutionsByLocation(
                                        location,
                                        safeKeyword,
                                        pageRequest
                                );


                return mergePreferredResults(
                        preferredInstitutions,
                        allInstitutions
                );
            }


            return institutionSearchRepository
                    .searchActiveInstitutionsByLocation(
                            location,
                            safeKeyword,
                            pageRequest
                    );
        }


        /*
         * CASE 2:
         *
         * Institution type is present,
         * but there is no explicit location.
         *
         * Example:
         * "universities Canada"
         *
         * Requested type is preferred,
         * but other institution types can
         * also appear.
         */
        if (requestedType != null) {

            String safeKeyword =
                    keyword == null ? "" : keyword;


            List<Institution> preferredInstitutions =
                    institutionSearchRepository
                            .searchActiveInstitutionsByType(
                                    safeKeyword,
                                    requestedType,
                                    pageRequest
                            );


            List<Institution> allInstitutions =
                    institutionSearchRepository
                            .searchActiveInstitutions(
                                    safeKeyword,
                                    pageRequest
                            );


            return mergePreferredResults(
                    preferredInstitutions,
                    allInstitutions
            );
        }


        /*
         * CASE 3:
         *
         * No institution type and no
         * explicit location.
         *
         * Example:
         * "Toronto"
         * "engineering"
         */
        String searchText =
                keyword == null || keyword.isBlank()
                        ? parsedQuery.getNormalizedQuery()
                        : keyword;


        return institutionSearchRepository
                .searchActiveInstitutions(
                        searchText,
                        pageRequest
                );
    }


    private List<Institution> mergePreferredResults(
            List<Institution> preferredInstitutions,
            List<Institution> allInstitutions) {

        Map<Long, Institution> uniqueInstitutions =
                new LinkedHashMap<>();


        /*
         * First add institutions matching
         * the requested type.
         */
        for (Institution institution :
                preferredInstitutions) {

            uniqueInstitutions.put(
                    institution.getId(),
                    institution
            );
        }


        /*
         * Then add all other matching
         * institutions.
         *
         * Duplicate institutions are ignored.
         */
        for (Institution institution :
                allInstitutions) {

            uniqueInstitutions.putIfAbsent(
                    institution.getId(),
                    institution
            );


            if (uniqueInstitutions.size()
                    >= MAX_SEARCH_RESULTS) {

                break;
            }
        }


        return new ArrayList<>(
                uniqueInstitutions.values()
        );
    }


    private SearchResult toSearchResult(
            Institution institution) {

        SearchResult result =
                new SearchResult();


        result.setId(
                institution.getId()
        );


        result.setName(
                institution.getName()
        );


        result.setDescription(
                institution.getDescription()
        );


        result.setAddress(
                institution.getAddress()
        );


        result.setCity(
                institution.getCity()
        );


        result.setState(
                institution.getState()
        );


        result.setCountry(
                institution.getCountry()
        );


        result.setCountryCode(
                institution.getCountryCode()
        );


        result.setWebsite(
                institution.getWebsite()
        );


        result.setEmail(
                institution.getEmail()
        );


        result.setPhone(
                institution.getPhone()
        );


        result.setCoverImageUrl(
                institution.getCoverImageUrl()
        );


        result.setType(
                institution.getType()
        );


        result.setVerified(
                institution.isVerified()
        );


        return result;
    }
}