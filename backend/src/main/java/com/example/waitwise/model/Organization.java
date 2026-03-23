package com.example.waitwise.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="organization")
@AllArgsConstructor
@ToString
@NoArgsConstructor
@Getter
@Setter
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long organizationId;

    @Column(unique = true, nullable = false)
    private String organizationCode;

    @Column(nullable = false)
    private String name;

    private String category; // e.g. "bank", "hospital", "others"
    private String address;
    private Integer waitTime; // in minutes
    private String distance; // e.g. "1.2 km"
    private Integer availableCounters;
    
    @Column(length = 1000)
    private String description;
    
    private String image; // URL to image

    @JsonProperty("active")
    private Boolean active = true;

    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Service> services;

    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Counter> counters;
}
