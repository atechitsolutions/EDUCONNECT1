package com.ALL_in_one.studyabroad.service;

import com.ALL_in_one.studyabroad.dto.InstitutionRequest;
import com.ALL_in_one.studyabroad.dto.InstitutionResponse;
import com.ALL_in_one.studyabroad.entity.Institution;
import com.ALL_in_one.studyabroad.mapper.InstitutionMapper;
import com.ALL_in_one.studyabroad.repository.InstitutionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstitutionService {

    private final InstitutionRepository institutionRepository;
    private final InstitutionMapper institutionMapper;

    public InstitutionResponse createInstitution(InstitutionRequest institutionRequest) {
        Institution institution = institutionMapper.toEntity(institutionRequest);
        Institution savedInstitution = institutionRepository.save(institution);
        return institutionMapper.toResponse(savedInstitution);
    }

    public InstitutionResponse updateInstitution(Long id, InstitutionRequest institutionRequest) {
        Institution existingInstitution = institutionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Institution Not Found"));

        existingInstitution.setName(institutionRequest.getName());
        existingInstitution.setDescription(institutionRequest.getDescription());
        existingInstitution.setAddress(institutionRequest.getAddress());
        existingInstitution.setCity(institutionRequest.getCity());
        existingInstitution.setState(institutionRequest.getState());
        existingInstitution.setCountry(institutionRequest.getCountry());
        existingInstitution.setCountryCode(institutionRequest.getCountryCode());
        existingInstitution.setWebsite(institutionRequest.getWebsite());
        existingInstitution.setEmail(institutionRequest.getEmail());
        existingInstitution.setPhone(institutionRequest.getPhone());
        existingInstitution.setCoverImageUrl(institutionRequest.getCoverImageUrl());
        existingInstitution.setType(institutionRequest.getType());
        existingInstitution.setStudyAbroadEnabled(institutionRequest.isStudyAbroadEnabled());
        existingInstitution.setActive(institutionRequest.isActive());
        existingInstitution.setVerified(institutionRequest.isVerified());

        Institution updatedInstitution = institutionRepository.save(existingInstitution);
        return institutionMapper.toResponse(updatedInstitution);
    }

    public InstitutionResponse getPublicInstitutionById(Long id) {
        Institution institution = institutionRepository
                .findByIdAndActiveTrueAndStudyAbroadEnabledTrue(id)
                .orElseThrow(() -> new RuntimeException("Institution Not Found"));

        return institutionMapper.toResponse(institution);
    }

    public InstitutionResponse getInstitutionById(Long id) {
        Institution institution = institutionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Institution Not Found"));

        return institutionMapper.toResponse(institution);
    }

    public List<InstitutionResponse> getPublicInstitutions() {
        return institutionRepository
                .findByActiveTrueAndStudyAbroadEnabledTrueOrderByCreatedAtDesc()
                .stream()
                .map(institutionMapper::toResponse)
                .toList();
    }

    public List<InstitutionResponse> getAllInstitutions() {
        return institutionRepository.findAll()
                .stream()
                .map(institutionMapper::toResponse)
                .toList();
    }

    public void deleteInstitution(Long id) {
        if (!institutionRepository.existsById(id)) {
            throw new RuntimeException("Institution not found with id: " + id);
        }

        institutionRepository.deleteById(id);
    }
}
