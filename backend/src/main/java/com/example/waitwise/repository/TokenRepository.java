package com.example.waitwise.repository;

import com.example.waitwise.model.Organization;
import com.example.waitwise.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token,Long> {
    List<Token> findByOrganization_OrganizationCodeAndCounter_CounterNumber(
            String organizationCode,
            String counterId
    );
    List<Token> findByCounter_CounterNumberAndStatusOrderByTokenIdAsc(
            String counterNumber,
            String status
    );

    Optional<Token> findFirstByStatusOrderByTokenIdAsc(String status);
}
