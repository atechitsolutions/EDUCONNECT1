package com.ALL_in_one.onlineeducation.service;

import com.ALL_in_one.onlineeducation.dto.OnlineEducationCardRequest;
import com.ALL_in_one.onlineeducation.dto.OnlineEducationCardResponse;
import com.ALL_in_one.onlineeducation.entity.OnlineEducationCard;
import com.ALL_in_one.onlineeducation.repository.OnlineEducationCardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OnlineEducationCardService {

    private final OnlineEducationCardRepository repository;

    public OnlineEducationCardService(OnlineEducationCardRepository repository) {
        this.repository = repository;
    }

    public List<OnlineEducationCardResponse> getActiveCards() {
        return repository.findByActiveTrueOrderByCreatedAtAsc().stream().map(this::toResponse).toList();
    }

    public List<OnlineEducationCardResponse> getAllCards() {
        return repository.findAll().stream().map(this::toResponse).toList();
    }

    public List<String> getRemovedCardIds() {
        return repository.findAll().stream().filter(card -> !card.isActive()).map(OnlineEducationCard::getId).toList();
    }

    public OnlineEducationCardResponse create(OnlineEducationCardRequest request) {
        return toResponse(repository.save(apply(new OnlineEducationCard(), request)));
    }

    public OnlineEducationCardResponse update(String id, OnlineEducationCardRequest request) {
        OnlineEducationCard card = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Online education card not found: " + id));
        return toResponse(repository.save(apply(card, request)));
    }

    public void delete(String id) {
        OnlineEducationCard card = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Online education card not found: " + id));
        card.setActive(false);
        repository.save(card);
    }

    private OnlineEducationCard apply(OnlineEducationCard card, OnlineEducationCardRequest request) {
        if (card.getId() == null && request.id() != null && !request.id().isBlank()) {
            card.setId(request.id());
        }
        card.setSection(request.section());
        card.setTitle(request.title().trim());
        card.setSubtitle(request.subtitle());
        card.setDescription(request.description());
        card.setLink(request.link());
        card.setProvider(request.provider());
        card.setSubject(request.subject());
        card.setLevel(request.level());
        card.setQualification(request.qualification());
        card.setMode(request.mode());
        card.setCountry(request.country());
        card.setDuration(request.duration());
        card.setImage(request.image());
        card.setActive(request.active() == null || request.active());
        return card;
    }

    private OnlineEducationCardResponse toResponse(OnlineEducationCard card) {
        return new OnlineEducationCardResponse(card.getId(), card.getSection(), card.getTitle(), card.getSubtitle(),
                card.getDescription(), card.getLink(), card.getProvider(), card.getSubject(), card.getLevel(),
                card.getQualification(), card.getMode(), card.getCountry(), card.getDuration(), card.getImage(),
                card.isActive(), card.getCreatedAt(), card.getUpdatedAt());
    }
}
