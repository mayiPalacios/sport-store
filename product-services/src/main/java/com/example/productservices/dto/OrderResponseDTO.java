package com.example.productservices.dto;


import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class OrderResponseDTO {
    private Long orderId;
    private LocalDateTime orderDate;
    private String shippingAddress;
    private String status;
    private LocalDateTime deliveryDate;
    private List<OrderItemResponseDTO> items;

    @Getter
    @Setter
    public static class OrderItemResponseDTO {
        private Long productId;
        private String nombre;
        private String descripcion;
        private BigDecimal precio;
        private String imagen;
        private Integer quantity;
    }
}