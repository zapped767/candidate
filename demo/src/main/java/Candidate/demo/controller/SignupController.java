package Candidate.demo.controller;

import Candidate.demo.DTO.LoginRequest;
import Candidate.demo.entity.Signup;
import Candidate.demo.repository.SignupRepository;
import Candidate.demo.service.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class SignupController {

    @Autowired
    private SignupService signupService;

    @Autowired
    private SignupRepository signupRepository; // Fixed: This should be used in login method

    @PostMapping("/signup")
    public ResponseEntity<String> signupUser(@RequestBody Signup signup) {
        try {
            String result = signupService.registerUser(signup);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        Optional<Signup> user = signupRepository.findByName(loginRequest.getName()); // Fixed: Using instance variable and correct method name

        if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) { // Added password check
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}