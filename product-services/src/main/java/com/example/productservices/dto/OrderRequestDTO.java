package com.example.productservices.dto;

import com.example.productservices.model.OrderItem;
import com.example.productservices.model.User;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class OrderRequestDTO {
    private User user;
    @NotNull
    private UUID userId;
    private String shippingAddress;
    private List<OrderItem> orderItems;
}