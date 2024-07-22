package com.example.productservices.repository;

import com.example.productservices.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.nombre LIKE %:searchTerm% OR p.descripcion LIKE %:searchTerm%")
    List<Product> searchProducts(@Param("searchTerm") String searchTerm);
}