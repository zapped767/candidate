package Candidate.demo.controller;

import Candidate.demo.entity.TrailRequest;
import Candidate.demo.service.TrailRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@RestController
@RequestMapping("/api/trail-request")
@CrossOrigin(origins = "*")
public class TrailRequestController {

    @Autowired
    private TrailRequestService service;

    // OS-agnostic upload directory path
    private final String UPLOAD_DIR = Paths.get(System.getProperty("user.dir"), "uploads").toString();

    // Define expected date format
    private static final DateTimeFormatter DATE_FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @PostMapping
    public TrailRequest createRequest(
            @RequestParam("lPermitDate") String lPermitDate,
            @RequestParam("drivingSchoolName") String drivingSchoolName,
            @RequestParam("lPermit") MultipartFile lPermit,
            @RequestParam("medicalFront") MultipartFile medicalFront,
            @RequestParam("medicalBack") MultipartFile medicalBack
    ) throws IOException {

        // 1. Clean and validate date
        LocalDate parsedDate;
        try {
            parsedDate = LocalDate.parse(lPermitDate.trim(), DATE_FORMATTER);
        } catch (DateTimeParseException ex) {
            throw new IllegalArgumentException("Invalid date format. Use yyyy-MM-dd.");
        }

        // 2. Ensure upload directory exists
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        // 3. Save files and build request
        TrailRequest request = new TrailRequest();
        request.setLPermitDate(parsedDate);
        request.setDrivingSchoolName(drivingSchoolName);
        request.setLPermitPath(saveFile(lPermit));
        request.setMedicalFrontPath(saveFile(medicalFront));
        request.setMedicalBackPath(saveFile(medicalBack));

        return service.save(request);
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        String filePath = Paths.get(UPLOAD_DIR, fileName).toString();

        File dest = new File(filePath);
        file.transferTo(dest);

        return filePath;
    }
}