package com.example.waitwise.repository;

import com.example.waitwise.model.Counter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CounterRepository extends JpaRepository<Counter,Long> {
Optional<Counter> findByCounterNumber(String counterNumber);
}
