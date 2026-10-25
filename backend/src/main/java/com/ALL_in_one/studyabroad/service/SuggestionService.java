package com.ALL_in_one.studyabroad.service;

import com.ALL_in_one.studyabroad.dto.SuggestionResponse;
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
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class SuggestionService {

    private static final int MAX_SUGGESTIONS = 10;
    private static final int MAX_INSTITUTIONS_TO_CHECK = 50;

    private final InstitutionSearchRepository institutionSearchRepository;
    private final QueryParserService queryParserService;

    public SuggestionResponse getSuggestions(String query) {

        String normalizedQuery = query == null
                ? ""
                : query.trim().replaceAll("\\s+", " ");

        SuggestionResponse response = new SuggestionResponse();
        response.setQuery(normalizedQuery);

        if (normalizedQuery.isBlank()) {
            response.setSuggestions(List.of());
            return response;
        }

        // Interpret institution type, location and keyword separately.
        ParsedSearchQuery parsedQuery =
                queryParserService.parseQuery(normalizedQuery);

        List<Institution> institutions = findSuggestionCandidates(
                normalizedQuery,
                parsedQuery
        );

        Set<String> suggestions = new LinkedHashSet<>();

        for (Institution institution : institutions) {

            addInstitutionSuggestions(
                    suggestions,
                    institution,
                    normalizedQuery
            );

            if (suggestions.size() >= MAX_SUGGESTIONS) {
                break;
            }
        }

        response.setSuggestions(
                suggestions.stream()
                        .limit(MAX_SUGGESTIONS)
                        .toList()
        );

        return response;
    }

    /**
     * Search using parsed query parts instead of asking one database field
     * to contain the entire natural-language phrase.
     *
     * Examples:
     * "universities in Toronto"
     * "colleges in Canada"
     * "University of Toronto"
     */
    private List<Institution> findSuggestionCandidates(
            String originalQuery,
            ParsedSearchQuery parsedQuery) {

        var pageable = PageRequest.of(
                0,
                MAX_INSTITUTIONS_TO_CHECK
        );

        Map<Long, Institution> matches = new LinkedHashMap<>();

        InstitutionType requestedType =
                parsedQuery.getInstitutionType();

        String location = parsedQuery.getLocation();

        String keyword = parsedQuery.getKeyword() == null
                ? ""
                : parsedQuery.getKeyword().trim();

        if (location != null && !location.isBlank()) {

            // Prefer results matching both institution type and location.
            if (requestedType != null) {

                addCandidates(
                        matches,
                        institutionSearchRepository
                                .searchActiveInstitutionsByTypeAndLocation(
                                        requestedType,
                                        location,
                                        keyword,
                                        pageable
                                )
                );
            }

            // Then include other institutions matching the location.
            addCandidates(
                    matches,
                    institutionSearchRepository
                            .searchActiveInstitutionsByLocation(
                                    location,
                                    keyword,
                                    pageable
                            )
            );

            /*
             * While the user is typing a longer query, retain location
             * candidates so autocomplete can still suggest the destination.
             */
            if (matches.size() < MAX_INSTITUTIONS_TO_CHECK
                    && !keyword.isBlank()) {

                if (requestedType != null) {

                    addCandidates(
                            matches,
                            institutionSearchRepository
                                    .searchActiveInstitutionsByTypeAndLocation(
                                            requestedType,
                                            location,
                                            "",
                                            pageable
                                    )
                    );
                }

                addCandidates(
                        matches,
                        institutionSearchRepository
                                .searchActiveInstitutionsByLocation(
                                        location,
                                        "",
                                        pageable
                                )
                );
            }

        } else if (requestedType != null) {

            // Supports queries such as "universities" or
            // "universities Toronto".
            addCandidates(
                    matches,
                    institutionSearchRepository
                            .searchActiveInstitutionsByType(
                                    keyword,
                                    requestedType,
                                    pageable
                            )
            );

            // Broaden the candidates using the keyword when available.
            if (!keyword.isBlank()
                    && matches.size() < MAX_INSTITUTIONS_TO_CHECK) {

                addCandidates(
                        matches,
                        institutionSearchRepository
                                .searchActiveInstitutions(
                                        keyword,
                                        pageable
                                )
                );
            }

        } else {

            String lookupQuery = keyword.isBlank()
                    ? originalQuery
                    : keyword;

            addCandidates(
                    matches,
                    institutionSearchRepository
                            .searchActiveInstitutions(
                                    lookupQuery,
                                    pageable
                            )
            );
        }

        return new ArrayList<>(matches.values());
    }

    private void addCandidates(
            Map<Long, Institution> target,
            List<Institution> candidates) {

        for (Institution institution : candidates) {

            // Avoid duplicate institutions across the repository queries.
            target.putIfAbsent(
                    institution.getId(),
                    institution
            );

            if (target.size() >= MAX_INSTITUTIONS_TO_CHECK) {
                return;
            }
        }
    }

    private void addInstitutionSuggestions(
            Set<String> suggestions,
            Institution institution,
            String query) {

        addMatchingSuggestion(
                suggestions,
                institution.getName(),
                query
        );

        addMatchingSuggestion(
                suggestions,
                institution.getCity(),
                query
        );

        addMatchingSuggestion(
                suggestions,
                institution.getState(),
                query
        );

        addMatchingSuggestion(
                suggestions,
                institution.getCountry(),
                query
        );

        addLocationTypeSuggestions(
                suggestions,
                institution.getCity(),
                institution.getType(),
                query
        );

        addLocationTypeSuggestions(
                suggestions,
                institution.getState(),
                institution.getType(),
                query
        );

        addLocationTypeSuggestions(
                suggestions,
                institution.getCountry(),
                institution.getType(),
                query
        );
    }

    private void addLocationTypeSuggestions(
            Set<String> suggestions,
            String location,
            InstitutionType type,
            String query) {

        if (location == null || location.isBlank()) {
            return;
        }

        if (type == InstitutionType.UNIVERSITY) {

            addMatchingSuggestion(
                    suggestions,
                    "Universities in " + location,
                    query
            );

        } else if (type == InstitutionType.COLLEGE) {

            addMatchingSuggestion(
                    suggestions,
                    "Colleges in " + location,
                    query
            );
        }
    }

    private void addMatchingSuggestion(
            Set<String> suggestions,
            String value,
            String query) {

        if (value == null || value.isBlank()) {
            return;
        }

        String cleanValue = value.trim();

        String normalizedValue =
                cleanValue.toLowerCase(Locale.ROOT);

        String normalizedQuery =
                query.trim().toLowerCase(Locale.ROOT);

        // Prefer suggestions that contain the full query.
        if (normalizedValue.contains(normalizedQuery)) {
            suggestions.add(cleanValue);
            return;
        }

        // Also support partial location terms while typing,
        // for example "universities in Tor" -> "Universities in Toronto".
        int lastSpace = normalizedQuery.lastIndexOf(' ');

        String lastTerm = normalizedQuery
                .substring(lastSpace + 1)
                .trim();

        if (lastTerm.length() >= 3
                && normalizedValue.contains(lastTerm)) {

            suggestions.add(cleanValue);
        }
    }
}