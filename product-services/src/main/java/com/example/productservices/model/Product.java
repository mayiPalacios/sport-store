package com.example.productservices.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Getter
@Setter
@Entity
@Data
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(length = 100)
    private String nombre;

    @NotBlank
    @Column(length = 500)
    private String descripcion;

    @NotNull
    private BigDecimal precio;

    @NotNull
    private Integer cantidad;

    @NotBlank
    @Column(length = 500)
    private String imagen;

}
