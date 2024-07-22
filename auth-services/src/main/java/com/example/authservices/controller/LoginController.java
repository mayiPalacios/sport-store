package com.example.authservices.controller;

import com.example.authservices.dto.LoginResponseDTO;
import com.example.authservices.dto.UserLoginDTO;
import com.example.authservices.dto.ResponseDTO;
import com.example.authservices.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }
    @CrossOrigin(origins = "http://localhost:3000/")
    @PostMapping("/login")
    public ResponseEntity<ResponseDTO<?>> loginUser(@Valid @RequestBody UserLoginDTO userLoginDTO) {
        ResponseDTO<LoginResponseDTO> response = new ResponseDTO<>();
        HttpStatus httpStatus;
        try {
            LoginResponseDTO loginResponse = userService.loginUser(userLoginDTO);
            httpStatus = HttpStatus.OK;
            response.setCode(httpStatus.value());
            response.setMessage("Login successful");
            response.setData(loginResponse);
        } catch (Exception e) {
            httpStatus = HttpStatus.UNAUTHORIZED;
            response.setCode(httpStatus.value());
            response.setMessage(e.getMessage());
        }
        return ResponseEntity.status(httpStatus).body(response);
    }
}
