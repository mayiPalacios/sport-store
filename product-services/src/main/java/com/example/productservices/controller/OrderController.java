package com.example.productservices.controller;

import com.example.productservices.dto.OrderRequestDTO;
import com.example.productservices.model.Order;
import com.example.productservices.model.OrderItem;
import com.example.productservices.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequestDTO orderRequestDTO) {
        UUID userId = orderRequestDTO.getUserId();
        String shippingAddress = orderRequestDTO.getShippingAddress();

        Order order = orderService.createOrder(userId, shippingAddress);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable UUID userId) {
        List<Order> orders = orderService.getOrdersByUserId(userId);
        if (orders.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(orders);
    }
}