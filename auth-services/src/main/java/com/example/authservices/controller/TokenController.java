package com.example.authservices.controller;

import com.example.authservices.util.JwtUtil;
import com.example.authservices.dto.ResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/token")
public class TokenController {

    private final JwtUtil jwtUtil;

    @Autowired
    public TokenController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @CrossOrigin(origins = {"http://localhost:3000/","http://localhost:8082/"})
    @GetMapping("/validate")
    public ResponseEntity<ResponseDTO<?>> validateToken(@RequestHeader("Authorization") String token) {
        ResponseDTO<String> response = new ResponseDTO<>();
        HttpStatus httpStatus;
        log.info("Registering Token: {}", token);
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            String email = jwtUtil.getEmailFromToken(token);
            log.info("Aqui entro: {}", email);
            boolean isValid = jwtUtil.validateToken(token, email);
         log.info("Token is valid: {} , email: {}", isValid, email);
            if (isValid) {
                httpStatus = HttpStatus.OK;
                response.setCode(httpStatus.value());
                response.setMessage("Token is valid");
                response.setData(email);
            } else {
                httpStatus = HttpStatus.UNAUTHORIZED;
                response.setCode(httpStatus.value());
                response.setMessage("Token is invalid or expired");
            }
        } catch (Exception e) {
            log.error("Errror autorization: {}", e.getMessage());
            httpStatus = HttpStatus.UNAUTHORIZED;
            response.setCode(httpStatus.value());
            response.setMessage("Token is invalid or expired");
        }

        return ResponseEntity.status(httpStatus).body(response);
    }
}