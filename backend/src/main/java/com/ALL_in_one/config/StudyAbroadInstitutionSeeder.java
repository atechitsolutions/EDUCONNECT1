package com.ALL_in_one.config;

import com.ALL_in_one.studyabroad.entity.Institution;
import com.ALL_in_one.studyabroad.enums.InstitutionType;
import com.ALL_in_one.studyabroad.repository.InstitutionRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/** Repeatable import of the supplied directory and separately attributed Commons campus images. */
@Configuration
public class StudyAbroadInstitutionSeeder {

    @Bean
    CommandLineRunner seedStudyAbroadInstitutions(
            InstitutionRepository repository) {
        ObjectMapper objectMapper = new ObjectMapper();
        return args -> {
            JsonNode directory;
            JsonNode imageReport;
            try (var input = new ClassPathResource("study-abroad-university-directory.json").getInputStream()) {
                directory = objectMapper.readTree(input);
            }
            try (var input = new ClassPathResource("university-image-sources.json").getInputStream()) {
                imageReport = objectMapper.readTree(input);
            }

            Map<String, JsonNode> images = new HashMap<>();
            for (JsonNode image : imageReport.path("entries")) {
                images.put(text(image, "code"), image);
            }

            List<Institution> changed = new ArrayList<>();
            int inserted = 0;
            int updated = 0;
            int imageCount = 0;
            int missingImages = 0;

            for (JsonNode countryNode : directory.path("countries")) {
                for (JsonNode record : countryNode.path("institutions")) {
                    String code = text(record, "code");
                    String country = text(record, "country");
                    String name = text(record, "name");
                    var existing = repository.findByDirectoryCode(code)
                            .or(() -> repository.findByNameIgnoreCaseAndCountryIgnoreCase(name, country));

                    Institution institution = existing.orElseGet(Institution::new);
                    if (existing.isPresent()) updated++; else inserted++;
                    institution.setDirectoryCode(code);
                    institution.setName(name);
                    institution.setCountry(country);
                    institution.setCountryCode(text(record, "countryCode"));
                    institution.setCity(text(record, "city"));
                    institution.setState(text(record, "state"));
                    institution.setType(toType(text(record, "type")));
                    institution.setEstablished(text(record, "established"));
                    institution.setTuition(text(record, "tuition"));
                    institution.setLivingCost(text(record, "living"));
                    institution.setRankings(text(record, "rankings"));
                    institution.setPopularCourses(text(record, "popularCourses"));
                    institution.setScholarships(text(record, "scholarships"));
                    institution.setIntakes(text(record, "intakes"));
                    institution.setEnglishTests(text(record, "englishTests"));
                    institution.setPostStudyWork(text(record, "postStudyWork"));
                    institution.setDataNote(text(record, "dataNote"));
                    institution.setStudyAbroadEnabled(true);
                    institution.setActive(true);
                    if (!existing.isPresent()) institution.setVerified(false);

                    String location = text(record, "location");
                    if (isBlank(institution.getDescription()) || "Study Abroad institution".equalsIgnoreCase(institution.getDescription().trim())) {
                        institution.setDescription(String.join(" · ",
                                List.of(location, text(record, "type"),
                                        isBlank(text(record, "established")) ? "" : "Established " + text(record, "established"))
                                        .stream().filter(value -> !isBlank(value)).toList()));
                    }

                    JsonNode image = images.get(code);
                    String imagePath = image == null ? "" : text(image, "path");
                    if (!isBlank(imagePath)) {
                        institution.setCoverImageUrl(imagePath);
                        institution.setImageSourceUrl(text(image, "sourcePage"));
                        institution.setImageLicense(text(image, "license"));
                        institution.setImageLicenseUrl(text(image, "licenseUrl"));
                        institution.setImageAttribution(text(image, "attribution"));
                        imageCount++;
                    } else {
                        // Keep any administrator-maintained image; never replace it with an unrelated stock photo.
                        missingImages++;
                    }
                    changed.add(institution);
                }
            }

            repository.saveAll(changed);
            System.out.printf("Study Abroad directory import complete: %d processed, %d inserted, %d updated, %d attributed local images, %d with no new verified image.%n",
                    changed.size(), inserted, updated, imageCount, missingImages);
        };
    }

    private static InstitutionType toType(String value) {
        String normalized = value == null ? "" : value.toLowerCase();
        if (normalized.contains("university")) return InstitutionType.UNIVERSITY;
        if (normalized.contains("college")) return InstitutionType.COLLEGE;
        return InstitutionType.INSTITUTION;
    }

    private static String text(JsonNode node, String field) {
        JsonNode value = node == null ? null : node.get(field);
        return value == null || value.isNull() ? "" : value.asText("").trim();
    }

    private static boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}



