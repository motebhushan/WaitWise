package com.example.waitwise.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "organization")
@Entity
@Table(name = "counter")
public class Counter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long counterId;

    @Column(nullable = false,unique = true)
    private String counterNumber;

    @Column(nullable = false)
    private String name; // e.g. "Counter 01"

    private String serviceId; // Linked identifier for the service (instead of arbitrary string)

    @ManyToOne
    @JoinColumn(name = "organization_id")
    @JsonBackReference
    private Organization organization;

    // Status can be "active" or "break"
    private String status = "active";

    public Long getCounterId() {
        return counterId;
    }

    public String getCounterNumber() {
        return counterNumber;
    }

    public String getName() {
        return name;
    }

    public String getServiceId() {
        return serviceId;
    }

    public Organization getOrganization() {
        return organization;
    }

    public String getStatus() {
        return status;
    }

    public void setCounterId(Long counterId) {
        this.counterId = counterId;
    }

    public void setCounterNumber(String counterNumber) {
        this.counterNumber = counterNumber;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
