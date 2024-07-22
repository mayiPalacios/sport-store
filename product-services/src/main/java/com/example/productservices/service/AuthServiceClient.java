package com.example.productservices.service;

import com.example.productservices.dto.ResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class AuthServiceClient {

    private final WebClient webClient;

    @Value("${auth.service.url}")
    private String authServiceUrl;

    public AuthServiceClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(authServiceUrl).build();
    }

    public boolean validateToken(String token) {
        log.info("Validating token: {}", token);

        ResponseDTO response = webClient.get()
                .uri(authServiceUrl + "/api/token/validate")
                .header("Authorization", "Bearer " + token)
                .retrieve()
                .bodyToMono(ResponseDTO.class)
                .block();

        if (response == null) {
            log.error("Token validation response is null");
            return false;
        }

        log.info("Token validation response code: {}", response.getCode());
        return response.getCode() == 200;
    }
}