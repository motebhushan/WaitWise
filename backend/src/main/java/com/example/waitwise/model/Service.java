package com.example.waitwise.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="service")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    @Column(nullable = false)
    private String name;

    private String description;
    
    // Expected wait time for this service in minutes
    private Integer waitTime;

    private Integer activeCounters;

    @ManyToOne
    @JoinColumn(name = "organization_id")
    @JsonBackReference
    private Organization organization;
}
