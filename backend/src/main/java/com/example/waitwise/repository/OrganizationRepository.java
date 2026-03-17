package com.example.waitwise.repository;

import com.example.waitwise.model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrganizationRepository extends JpaRepository<Organization,Long> {
    Optional<Organization> findByOrganizationCode(String organizationCode);
}
