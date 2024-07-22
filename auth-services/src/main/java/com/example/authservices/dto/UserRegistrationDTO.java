package com.example.authservices.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@Data
@ToString
public class UserRegistrationDTO {

    @NotBlank
    @Size(max = 50)
    private String firstName;

    @NotBlank
    @Size(max = 50)
    private String lastName;

    @NotBlank
    @Size(max = 100)
    private String address;

    @NotBlank
    @Email
    @Size(max = 50)
    private String email;

    @Past
    private LocalDate birthDate;

    @NotBlank
    @Size(min = 6)
    private String password;

}
