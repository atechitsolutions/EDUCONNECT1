package com.ALL_in_one.onlineeducation.repository;

import com.ALL_in_one.onlineeducation.entity.OnlineEducationCard;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OnlineEducationCardRepository extends JpaRepository<OnlineEducationCard, String> {
  List<OnlineEducationCard> findByActiveTrueOrderByCreatedAtAsc();
}
