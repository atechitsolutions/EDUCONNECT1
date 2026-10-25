package com.ALL_in_one.studyabroad.controller;

import com.ALL_in_one.studyabroad.dto.InstitutionRequest;
import com.ALL_in_one.studyabroad.dto.InstitutionResponse;
import com.ALL_in_one.studyabroad.service.InstitutionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/institution")
public class InstitutionController {

    private final InstitutionService institutionService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InstitutionResponse> createInstitution(
            @RequestBody InstitutionRequest institutionRequest) {

        InstitutionResponse response =
                institutionService.createInstitution(institutionRequest);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<InstitutionResponse>> getPublicInstitutions() {
        return ResponseEntity.ok(
                institutionService.getPublicInstitutions()
        );
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<InstitutionResponse>> getAllInstitutionsForAdmin() {
        return ResponseEntity.ok(
                institutionService.getAllInstitutions()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstitutionResponse> getInstitutionById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                institutionService.getPublicInstitutionById(id)
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InstitutionResponse> updateInstitution(
            @PathVariable Long id,
            @RequestBody InstitutionRequest institutionRequest) {

        return ResponseEntity.ok(
                institutionService.updateInstitution(id, institutionRequest)
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteInstitution(@PathVariable Long id) {
        institutionService.deleteInstitution(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
