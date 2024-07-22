package com.example.productservices.service;

import com.example.productservices.dto.CartItemResponseDto;
import com.example.productservices.dto.CartRequestDto;
import com.example.productservices.model.CartItem;
import com.example.productservices.model.Product;
import com.example.productservices.model.User;
import com.example.productservices.repository.CartItemRepository;
import com.example.productservices.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public CartItem addToCart(User user, Long productId, Integer quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (product.getCantidad() < quantity) {
            throw new RuntimeException("Cantidad insuficiente del producto");
        }

        product.setCantidad(product.getCantidad() - quantity);
        productRepository.save(product);

        CartItem cartItem = new CartItem();
        cartItem.setUser(user);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);

        return cartItemRepository.save(cartItem);
    }

    public List<CartItemResponseDto> getCartItemsByUser(User user) {
        List<CartItem> cartItems = cartItemRepository.findByUser(user);
        return cartItems.stream().map(cartItem -> {
            Product product = cartItem.getProduct();
            return new CartItemResponseDto(
                    cartItem.getId(),
                    product.getId(),
                    product.getNombre(),
                    product.getDescripcion(),
                    product.getPrecio(),
                    product.getCantidad(),
                    product.getImagen(),
                    cartItem.getQuantity()
            );
        }).collect(Collectors.toList());
    }

    public void clearCart(User user) {
        cartItemRepository.deleteByUser(user);
    }

}