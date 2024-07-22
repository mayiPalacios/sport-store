package com.example.authservices.controller;


import com.example.authservices.dto.ResponseDTO;
import com.example.authservices.dto.UserRegistrationDTO;
import com.example.authservices.model.User;
import com.example.authservices.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
public class RegisterController {

    private final UserService userService;

    @Autowired

    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @PostMapping("/user")
    public ResponseEntity<ResponseDTO<?>> registerUser(@Valid @RequestBody UserRegistrationDTO userDto) {
        log.info("Registering user: {}", userDto);
        ResponseDTO<User> response = new ResponseDTO<>();
        HttpStatus httpStatus;
        try {
            User savedClient = userService.registerUser(userDto);
            log.info("Client created: {}", savedClient);
            if (savedClient == null) {
                throw new Exception("Ocurrio un error al crear el usuario");
            }
            httpStatus = HttpStatus.CREATED;
            response.setCode(httpStatus.value());
            response.setMessage("User created successfully ");
            response.setData(savedClient);
        } catch (Exception e) {
            log.error("Error creating client: {}", e.getMessage());
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            response.setCode(httpStatus.value());
            response.setMessage("Ocurrio un error al crear el usuario");
        }
        return ResponseEntity.status(httpStatus).body(response);
    }
}
