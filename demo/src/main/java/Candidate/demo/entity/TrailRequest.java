package Candidate.demo.entity;

import jakarta.persistence.*;

import lombok.Data;


import java.time.LocalDate;

@Entity
@Data
public class TrailRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate lPermitDate;

    private String drivingSchoolName;

    private String lPermitPath;

    private String medicalFrontPath;

    private String medicalBackPath;
}



