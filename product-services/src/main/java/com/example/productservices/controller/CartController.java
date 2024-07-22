package com.example.productservices.controller;


import com.example.productservices.dto.CartItemResponseDto;
import com.example.productservices.dto.CartRequestDto;
import com.example.productservices.model.CartItem;
import com.example.productservices.model.User;
import com.example.productservices.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestBody CartRequestDto cartRequestDto) {
        User user = new User();
        user.setId(cartRequestDto.getUserId());

        CartItem cartItem = cartService.addToCart(user, cartRequestDto.getProductId(), cartRequestDto.getQuantity());
        return ResponseEntity.ok(cartItem);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItemResponseDto>> getCartItems(@PathVariable UUID userId) {
        User user = new User();
        user.setId(userId);

        List<CartItemResponseDto> cartItems = cartService.getCartItemsByUser(user);
        return ResponseEntity.ok(cartItems);
    }
}