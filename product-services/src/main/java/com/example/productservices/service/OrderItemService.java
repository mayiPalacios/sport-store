package com.example.productservices.service;

import com.example.productservices.model.OrderItem;
import com.example.productservices.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;

    @Autowired
    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    public List<OrderItem> getOrderItemsByOrderId(Long orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }
}