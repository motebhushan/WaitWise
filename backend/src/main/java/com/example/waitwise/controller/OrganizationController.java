package com.example.waitwise.controller;

import com.example.waitwise.model.Organization;
import com.example.waitwise.service.OrganizationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/public/")
@RestController
public class OrganizationController {
   private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @PostMapping("new/organization")
    Organization NewOrganization(@RequestBody Organization organization){

        return organizationService.newOrganization(organization);
    }
    @GetMapping("/getAll")
    List<Organization>getAll(){
      return  organizationService.getAll();
    }
}
