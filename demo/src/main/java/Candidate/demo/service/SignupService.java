package Candidate.demo.service;


import Candidate.demo.entity.Signup;
import Candidate.demo.repository.SignupRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Data
@Service
public class SignupService {

    @Autowired
    private SignupRepository signupRepository;

    public String registerUser(Signup signup) {
        if (signupRepository.existsByEmail(signup.getEmail())) {
            return "Email already exists";
        }
        signupRepository.save(signup);
        return "Account created successfully";
    }
}
