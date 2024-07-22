package com.example.authservices.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@Data
public class UserLoginDTO {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;
}
