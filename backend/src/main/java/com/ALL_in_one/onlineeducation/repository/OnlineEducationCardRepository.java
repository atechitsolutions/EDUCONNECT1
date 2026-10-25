package com.ALL_in_one.onlineeducation.repository;

import com.ALL_in_one.onlineeducation.entity.OnlineEducationCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OnlineEducationCardRepository extends JpaRepository<OnlineEducationCard, String> {
    List<OnlineEducationCard> findByActiveTrueOrderByCreatedAtAsc();
}
