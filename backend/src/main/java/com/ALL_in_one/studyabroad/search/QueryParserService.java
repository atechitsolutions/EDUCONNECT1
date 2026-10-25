package com.ALL_in_one.studyabroad.search;

import com.ALL_in_one.studyabroad.enums.InstitutionType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QueryParserService {

    private static final List<String> FILLER_WORDS = List.of(
            "best",
            "top",
            "popular",
            "famous",
            "leading",
            "good",
            "great"
    );

    private static final List<String> LOCATION_CONNECTORS = List.of(
            " in ",
            " near ",
            " around ",
            " at "
    );


    public ParsedSearchQuery parseQuery(String query) {

        String originalQuery =
                query == null ? "" : query.trim();

        String normalizedQuery =
                normalizeQuery(originalQuery);


        if (normalizedQuery.isBlank()) {

            return new ParsedSearchQuery(
                    originalQuery,
                    normalizedQuery,
                    null,
                    null,
                    ""
            );
        }


        InstitutionType institutionType =
                extractInstitutionType(normalizedQuery);


        String cleanedQuery =
                removeFillerWords(normalizedQuery);


        int connectorIndex =
                findFirstConnector(cleanedQuery);


        String location = null;

        String keyword;


        if (connectorIndex != -1) {

            String connector =
                    getConnectorAtIndex(
                            cleanedQuery,
                            connectorIndex
                    );


            String beforeLocation =
                    cleanedQuery.substring(
                            0,
                            connectorIndex
                    ).trim();


            String afterConnector =
                    cleanedQuery.substring(
                            connectorIndex + connector.length()
                    ).trim();


            int forIndex =
                    afterConnector.indexOf(" for ");


            if (forIndex != -1) {

                location =
                        afterConnector
                                .substring(
                                        0,
                                        forIndex
                                )
                                .trim();


                String keywordAfterLocation =
                        afterConnector
                                .substring(
                                        forIndex + 5
                                )
                                .trim();


                String keywordBeforeLocation =
                        removeInstitutionTypeWords(
                                beforeLocation
                        );


                keyword =
                        combineKeywords(
                                keywordBeforeLocation,
                                keywordAfterLocation
                        );

            } else {

                location = afterConnector;


                keyword =
                        removeInstitutionTypeWords(
                                beforeLocation
                        );
            }

        } else {

            keyword =
                    removeInstitutionTypeWords(
                            cleanedQuery
                    );
        }


        return new ParsedSearchQuery(
                originalQuery,
                normalizedQuery,
                institutionType,
                cleanValue(location),
                cleanValue(keyword)
        );
    }


    private String normalizeQuery(String query) {

        return query
                .toLowerCase()
                .trim()
                .replaceAll("\\s+", " ");
    }


    private InstitutionType extractInstitutionType(
            String query) {

        if (query.contains("universities")
                || query.contains("university")) {

            return InstitutionType.UNIVERSITY;
        }


        if (query.contains("colleges")
                || query.contains("college")) {

            return InstitutionType.COLLEGE;
        }


        return null;
    }


    private String removeFillerWords(String query) {

        String cleanedQuery = query;


        for (String fillerWord : FILLER_WORDS) {

            cleanedQuery =
                    cleanedQuery.replaceAll(
                            "\\b" + fillerWord + "\\b",
                            " "
                    );
        }


        return cleanedQuery
                .replaceAll("\\s+", " ")
                .trim();
    }


    private String removeInstitutionTypeWords(
            String value) {

        return value
                .replaceAll("\\buniversities\\b", " ")
                .replaceAll("\\buniversity\\b", " ")
                .replaceAll("\\bcolleges\\b", " ")
                .replaceAll("\\bcollege\\b", " ")
                .replaceAll("\\s+", " ")
                .trim();
    }


    private String combineKeywords(
            String firstKeyword,
            String secondKeyword) {

        String first =
                cleanValue(firstKeyword);

        String second =
                cleanValue(secondKeyword);


        if (first == null) {
            return second == null ? "" : second;
        }


        if (second == null) {
            return first;
        }


        return first + " " + second;
    }


    private int findFirstConnector(String query) {

        int firstIndex = -1;


        for (String connector :
                LOCATION_CONNECTORS) {

            int currentIndex =
                    query.indexOf(connector);


            if (currentIndex != -1) {

                if (firstIndex == -1
                        || currentIndex < firstIndex) {

                    firstIndex = currentIndex;
                }
            }
        }


        return firstIndex;
    }


    private String getConnectorAtIndex(
            String query,
            int connectorIndex) {

        for (String connector :
                LOCATION_CONNECTORS) {

            if (query.startsWith(
                    connector,
                    connectorIndex
            )) {

                return connector;
            }
        }


        return "";
    }


    private String cleanValue(String value) {

        if (value == null) {
            return null;
        }


        String cleaned =
                value
                        .replaceAll("\\s+", " ")
                        .trim();


        return cleaned.isBlank()
                ? null
                : cleaned;
    }
}