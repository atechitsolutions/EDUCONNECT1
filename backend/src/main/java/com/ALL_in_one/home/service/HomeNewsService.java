package com.ALL_in_one.home.service;

import com.ALL_in_one.home.dto.HomeNewsRequest;
import com.ALL_in_one.home.dto.HomeNewsResponse;
import com.ALL_in_one.home.entity.HomeNews;
import com.ALL_in_one.home.exception.HomeResourceNotFoundException;
import com.ALL_in_one.home.repository.HomeNewsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeNewsService {

    private final HomeNewsRepository repository;

    public HomeNewsService(HomeNewsRepository repository) {
        this.repository = repository;
    }

    public List<HomeNewsResponse> getPublishedNews() {

        return repository
                .findByPublishedTrueOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public HomeNewsResponse getPublishedNewsById(Long id) {
        HomeNews news = repository.findById(id)
                .filter(HomeNews::isPublished)
                .orElseThrow(() -> new HomeResourceNotFoundException("Published news not found: " + id));
        return toResponse(news);
    }

    public List<HomeNewsResponse> getAllNews() {

        return repository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public HomeNewsResponse create(HomeNewsRequest request) {

        HomeNews news = new HomeNews();

        apply(news, request);

        return toResponse(repository.save(news));
    }

    public HomeNewsResponse update(
            Long id,
            HomeNewsRequest request
    ) {

        HomeNews news = repository
                .findById(id)
                .orElseThrow(
                        () -> new HomeResourceNotFoundException(
                                "News not found: " + id
                        )
                );

        apply(news, request);

        return toResponse(repository.save(news));
    }

    public void delete(Long id) {

        HomeNews news = repository
                .findById(id)
                .orElseThrow(
                        () -> new HomeResourceNotFoundException(
                                "News not found: " + id
                        )
                );

        repository.delete(news);
    }

    private void apply(
            HomeNews news,
            HomeNewsRequest request
    ) {

        news.setTitle(request.title().trim());

        news.setSubtitle(
                clean(request.subtitle())
        );

        news.setDescription(
                request.description().trim()
        );

        news.setCategory(
                request.category().trim()
        );

        news.setCountry(
                clean(request.country())
        );

        news.setProgram(
                clean(request.program())
        );

        news.setRating(request.rating());

        news.setReviews(request.reviews());

        news.setScore(request.score());

        news.setHighlight(
                clean(request.highlight())
        );

        news.setImageUrl(
                clean(request.imageUrl())
        );

        news.setSourceUrl(
                clean(request.sourceUrl())
        );

        news.setActionLabel(
                clean(request.actionLabel())
        );

        news.setSection(
                request.section().trim().toUpperCase()
        );

        news.setPublished(
                request.published()
        );
    }

    private String clean(String value) {

        if (value == null) {
            return null;
        }

        String trimmed = value.trim();

        return trimmed.isEmpty() ? null : trimmed;
    }

    private HomeNewsResponse toResponse(HomeNews news) {

        return new HomeNewsResponse(

                news.getId(),

                news.getTitle(),

                news.getSubtitle(),

                news.getDescription(),

                news.getCategory(),

                news.getCountry(),

                news.getProgram(),

                news.getRating(),

                news.getReviews(),

                news.getScore(),

                news.getHighlight(),

                news.getImageUrl(),

                news.getSourceUrl(),

                news.getActionLabel(),

                news.getSection(),

                news.isPublished(),

                news.getCreatedAt(),

                news.getUpdatedAt()
        );
    }
}