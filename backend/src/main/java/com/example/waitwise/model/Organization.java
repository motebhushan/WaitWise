package com.example.waitwise.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

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
    private String organizationName;

    private String category; // e.g. "bank", "hospital", "others"
    private String address;
    private Integer waitTime; // in minutes
    private String distance; // e.g. "1.2 km"
    private Integer availableCounters;
    
    @Column(length = 1000)
    private String description;
    
    private String image; // URL to image

    private Boolean isActive = true;

    private LocalDateTime createdAt;
    
    // Establishing mapping for fetching services and tokens later
    // if needed (often better handled in DTOs, but added for completeness)
}
