package com.example.productservices.dto;

import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartItemResponseDto {
    private Long cartItemId;
    private Long productId;
    private String productName;
    private String productDescription;
    private BigDecimal productPrice;
    private Integer productQuantity;
    private String productImage;
    private Integer quantity;

    public CartItemResponseDto(Long cartItemId, Long productId, String productName, String productDescription, BigDecimal productPrice, Integer productQuantity, String productImage, Integer quantity) {
        this.cartItemId = cartItemId;
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.productQuantity = productQuantity;
        this.productImage = productImage;
        this.quantity = quantity;
    }
}