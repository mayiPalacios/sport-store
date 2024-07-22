package com.example.productservices.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Entity
@Data
@ToString(exclude = "password")
@Table(name = "users")
public class User  {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(unique = true, updatable = false, nullable = false)
    private UUID id;

    @NotBlank
    @Size(max = 50)
    @Column(length = 50)
    private String firstName;

    @NotBlank
    @Size(max = 50)
    @Column(length = 50)
    private String lastName;

    @NotBlank
    @Size(max = 100)
    @Column(length = 100)
    private String address;

    @NotBlank
    @Email
    @Size(max = 50)
    @Column(length = 50, unique = true)
    private String email;

    @Past
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(columnDefinition = "DATE")
    private LocalDate birthDate;

    @NotBlank
    @Size(min = 6)
    @JsonIgnore
    @Column(length = 100)
    private String password;
}