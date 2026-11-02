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

@Configuration
public class DomesticCollegeSeeder {

    @Bean
    CommandLineRunner seedDomesticColleges(InstitutionRepository repository) {
        ObjectMapper mapper = new ObjectMapper();
        return args -> {
            JsonNode colleges;
            try (var input = new ClassPathResource("domestic-college-directory.json").getInputStream()) {
                colleges = mapper.readTree(input);
            }

            int added = 0;
            for (JsonNode record : colleges) {
                String code = record.path("code").asText();
                String name = record.path("name").asText();
                var existing = repository.findByDirectoryCode(code)
                        .or(() -> repository.findByNameIgnoreCaseAndCountryIgnoreCase(name, "India"));
                Institution institution = existing.orElseGet(Institution::new);
                institution.setDirectoryCode(code);
                institution.setName(name);
                institution.setCity(record.path("city").asText());
                institution.setCountry("India");
                institution.setCountryCode("IN");
                institution.setType(InstitutionType.valueOf(record.path("type").asText()));
                institution.setActive(true);
                // These homepage colleges belong in partner management without adding them
                // to the separate international study-abroad catalogue.
                if (existing.isEmpty()) institution.setStudyAbroadEnabled(false);
                repository.save(institution);
                if (existing.isEmpty()) added++;
            }
            System.out.printf("Domestic college directory ready: %d records, %d newly added.%n", colleges.size(), added);
        };
    }
}
