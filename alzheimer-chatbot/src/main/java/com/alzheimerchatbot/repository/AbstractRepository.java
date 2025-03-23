package com.alzheimerchatbot.repository;

import com.alzheimerchatbot.model.Abstract;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AbstractRepository extends JpaRepository<Abstract, Long> {
}