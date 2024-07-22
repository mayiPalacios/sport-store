package com.example.authservices.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@ToString
@Data
public class UserDTO {
    private UUID id;
    private String firstName;
    private String lastName;
    private String address;
    private String email;
    private LocalDate birthDate;

    public UserDTO(UUID id, String firstName, String lastName, String address, String email, LocalDate birthDate) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.birthDate = birthDate;
    }
}