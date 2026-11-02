package com.ALL_in_one.collegepartner.controller;
import com.ALL_in_one.collegepartner.service.CollegePartnerService;
import com.ALL_in_one.collegepartner.dto.CollegeAnalyticsEventRequest;
import jakarta.validation.Valid;
import com.ALL_in_one.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController @RequiredArgsConstructor @RequestMapping("/api/analytics")
public class CollegeAnalyticsController {
    private final CollegePartnerService service;
    private final UserRepository users;
    @PostMapping("/college-event") public Map<String,String> event(@Valid @RequestBody CollegeAnalyticsEventRequest payload, @RequestHeader(value="X-Visitor-Id",required=false) String visitorId, Authentication authentication) {
        Long studentId = null;
        if (authentication != null && authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).anyMatch("ROLE_STUDENT"::equals)) {
            studentId = users.findByEmail(authentication.getName()).map(user -> user.getId()).orElse(null);
        }
        service.recordEvent(payload.institutionId(), visitorId, payload.eventType(), payload.course(), studentId);
        return Map.of("status","recorded");
    }
}
