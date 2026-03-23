package com.example.waitwise.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "token")
@AllArgsConstructor
@NoArgsConstructor

public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long tokenId;

    @Column(nullable = false)
    @JsonProperty("number")
    private String tokenNumber;

    private String customerName;
    private String userMobile;

    @Column(nullable = false)
    private String serviceId;

    @Column(nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "organization_id")
    @JsonBackReference
    private Organization organization;

    @ManyToOne
    @JoinColumn(name = "counter_id", nullable = true)
    @JsonBackReference
    private Counter counter;

    private String arrivalTime; // Or LocalDateTime if formatting later

    public Long getTokenId() {
        return tokenId;
    }

    public void setTokenId(Long tokenId) {
        this.tokenId = tokenId;
    }

    public String getTokenNumber() {
        return tokenNumber;
    }

    public void setTokenNumber(String tokenNumber) {
        this.tokenNumber = tokenNumber;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public String getUserMobile() {
        return userMobile;
    }

    public void setUserMobile(String userMobile) {
        this.userMobile = userMobile;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Counter getCounter() {
        return counter;
    }

    public void setCounter(Counter counter) {
        this.counter = counter;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    @JsonProperty("counterId")
    public String getCounterIdProperty() {
        return counter != null ? counter.getCounterNumber() : null;
    }
}
