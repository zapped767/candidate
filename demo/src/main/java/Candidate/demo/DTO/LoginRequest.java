package Candidate.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginRequest{
    // Proper getters and setters
    private String name;
    private String password;

    // Default constructor
    public LoginRequest() {
    }

    // Parameterized constructor
    public LoginRequest(String name, String password) {
        this.name = name;
        this.password = password;
    }

}