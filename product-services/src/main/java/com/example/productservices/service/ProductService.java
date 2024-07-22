package com.example.productservices.service;

import com.example.productservices.model.Product;
import com.example.productservices.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public void updateProductQuantity(Long id, Integer newQuantity) {
        Product product = getProductById(id);
        product.setCantidad(newQuantity);
        productRepository.save(product);
    }

    public List<Product> searchProducts(String searchTerm) {
        return productRepository.searchProducts(searchTerm);
    }
}