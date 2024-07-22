package com.example.productservices.service;

import com.example.productservices.dto.OrderRequestDTO;
import com.example.productservices.dto.OrderResponseDTO;
import com.example.productservices.model.*;
import com.example.productservices.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartService cartService;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, CartService cartService, CartItemRepository cartItemRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartService = cartService;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public List<CartItem> getCartItemsByUser(User user) {
        return cartItemRepository.findByUser(user);
    }

    @Transactional
    public OrderResponseDTO createOrder(UUID userId, String shippingAddress) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setShippingAddress(shippingAddress);
        order.setStatus("CREATED");
        order.setDeliveryDate(LocalDateTime.now().plusDays(3));

        List<CartItem> cartItems = cartItemRepository.findByUser(user);
        if (cartItems.isEmpty()) {
            throw new IllegalArgumentException("Cart is empty");
        }

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItems.add(orderItem);

            // Reducir la cantidad del producto en el inventario
            Product product = cartItem.getProduct();
            product.setCantidad(product.getCantidad() - cartItem.getQuantity());
            productRepository.save(product);
        }

        order.setOrderItems(orderItems);
        Order savedOrder = orderRepository.save(order);

        // Eliminar los artículos del carrito después de confirmar la orden
        cartItemRepository.deleteByUser(user);

        return mapToOrderResponseDTO(savedOrder);
    }

    public List<OrderResponseDTO> getOrdersByUserId(UUID userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream()
                .map(this::mapToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    private OrderResponseDTO mapToOrderResponseDTO(Order order) {
        OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
        orderResponseDTO.setOrderId(order.getId());
        orderResponseDTO.setOrderDate(order.getOrderDate());
        orderResponseDTO.setShippingAddress(order.getShippingAddress());
        orderResponseDTO.setStatus(order.getStatus());
        orderResponseDTO.setDeliveryDate(order.getDeliveryDate());

        List<OrderResponseDTO.OrderItemResponseDTO> items = order.getOrderItems().stream().map(item -> {
            OrderResponseDTO.OrderItemResponseDTO itemDTO = new OrderResponseDTO.OrderItemResponseDTO();
            itemDTO.setProductId(item.getProduct().getId());
            itemDTO.setNombre(item.getProduct().getNombre());
            itemDTO.setDescripcion(item.getProduct().getDescripcion());
            itemDTO.setPrecio(item.getProduct().getPrecio());
            itemDTO.setImagen(item.getProduct().getImagen());
            itemDTO.setQuantity(item.getQuantity());
            return itemDTO;
        }).collect(Collectors.toList());

        orderResponseDTO.setItems(items);
        return orderResponseDTO;
    }


}