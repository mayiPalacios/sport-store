package com.example.authservices.dto;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Data
public class LoginResponseDTO {

    private String token;
    private UserDTO user;

    public LoginResponseDTO(String token, UserDTO user) {
        this.token = token;
        this.user = user;
    }

}
