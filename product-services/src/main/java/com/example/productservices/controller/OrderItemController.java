package com.example.productservices.controller;

import com.example.productservices.model.OrderItem;
import com.example.productservices.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/order-items")
public class OrderItemController {

    private final OrderItemService orderItemService;

    @Autowired
    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<OrderItem>> getOrderItemsByOrderId(@PathVariable Long orderId) {
        List<OrderItem> orderItems = orderItemService.getOrderItemsByOrderId(orderId);
        if (orderItems.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(orderItems);
    }
}