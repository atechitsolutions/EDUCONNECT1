package com.ALL_in_one.home.service;

import com.ALL_in_one.home.dto.HomeUpdateRequest;
import com.ALL_in_one.home.dto.HomeUpdateResponse;
import com.ALL_in_one.home.entity.HomeUpdate;
import com.ALL_in_one.home.exception.HomeResourceNotFoundException;
import com.ALL_in_one.home.repository.HomeUpdateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeUpdateService {

    private static final String CURRENT_AFFAIRS = "CURRENT_AFFAIRS";

    private final HomeUpdateRepository repository;

    public HomeUpdateService(HomeUpdateRepository repository) {
        this.repository = repository;
    }

    public List<HomeUpdateResponse> getActiveUpdates() {
        return repository.findByActiveTrueOrderBySortOrderAscCreatedAtDesc()
                .stream().map(this::toResponse).toList();
    }

    public List<HomeUpdateResponse> getActiveCurrentAffairs() {
        return repository
                .findByActiveTrueAndTypeOrderBySortOrderAscCreatedAtDesc(CURRENT_AFFAIRS)
                .stream().map(this::toResponse).toList();
    }

    public List<HomeUpdateResponse> getAllUpdates() {
        return repository.findAllByOrderBySortOrderAscCreatedAtDesc()
                .stream().map(this::toResponse).toList();
    }

    public HomeUpdateResponse create(HomeUpdateRequest request) {
        return toResponse(repository.save(apply(new HomeUpdate(), request)));
    }

    public HomeUpdateResponse update(Long id, HomeUpdateRequest request) {
        HomeUpdate update = repository.findById(id)
                .orElseThrow(() -> new HomeResourceNotFoundException("Update not found: " + id));
        return toResponse(repository.save(apply(update, request)));
    }

    public void delete(Long id) {
        HomeUpdate update = repository.findById(id)
                .orElseThrow(() -> new HomeResourceNotFoundException("Update not found: " + id));
        repository.delete(update);
    }

    private HomeUpdate apply(HomeUpdate update, HomeUpdateRequest request) {
        update.setTitle(request.title().trim());
        update.setSubtitle(request.subtitle().trim());
        update.setDescription(request.description());
        update.setType(request.type());
        update.setIcon(request.icon());
        update.setTargetUrl(request.targetUrl());
        update.setActive(request.active());
        update.setSortOrder(request.sortOrder());
        return update;
    }

    private HomeUpdateResponse toResponse(HomeUpdate update) {
        return new HomeUpdateResponse(
                update.getId(),
                update.getTitle(),
                update.getSubtitle(),
                update.getDescription(),
                update.getType(),
                update.getIcon(),
                update.getTargetUrl(),
                update.isActive(),
                update.getSortOrder(),
                update.getCreatedAt(),
                update.getUpdatedAt()
        );
    }
}
