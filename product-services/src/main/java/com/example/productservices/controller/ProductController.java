package com.example.productservices.controller;

import com.example.productservices.model.Product;
import com.example.productservices.service.AuthServiceClient;
import com.example.productservices.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController

@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(@RequestHeader("Authorization") String token) {
        List<Product> products = productService.getAllProducts();
        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestHeader("Authorization") String token, @RequestParam String searchTerm) {
        List<Product> products = productService.searchProducts(searchTerm);
        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }
}
