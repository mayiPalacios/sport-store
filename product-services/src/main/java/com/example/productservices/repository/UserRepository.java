package com.example.productservices.repository;

import com.example.productservices.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}
