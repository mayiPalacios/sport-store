package com.example.productservices.component;

import com.example.productservices.service.AuthServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private AuthServiceClient authServiceClient;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            if (authServiceClient.validateToken(jwt)) {
                chain.doFilter(request, response);
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token");
            }
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization header is missing or invalid");
        }
    }
}