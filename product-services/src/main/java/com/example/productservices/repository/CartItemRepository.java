package com.example.productservices.repository;

import com.example.productservices.model.CartItem;
import com.example.productservices.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    void deleteByUser(User user);
}