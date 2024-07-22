package com.example.productservices.dto;

import com.example.productservices.model.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CartRequestDto {
    private UUID userId;
    private Long productId;
    private Product product;
    private Integer quantity;
}