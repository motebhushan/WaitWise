package com.example.waitwise.service;

import com.example.waitwise.model.Organization;
import com.example.waitwise.repository.OrganizationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganizationService {
    private final OrganizationRepository organizationRepository;

    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

   public Organization newOrganization(Organization organization){
        Organization result=organizationRepository.save(organization);
        return result;
    }

    public List<Organization> getAll() {
        return organizationRepository.findAll();
    }
}
