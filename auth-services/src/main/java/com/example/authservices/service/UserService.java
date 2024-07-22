package com.example.authservices.service;

import com.example.authservices.dto.LoginResponseDTO;
import com.example.authservices.dto.UserDTO;
import com.example.authservices.dto.UserLoginDTO;
import com.example.authservices.dto.UserRegistrationDTO;
import com.example.authservices.mapper.UserMapper;
import com.example.authservices.model.User;
import com.example.authservices.repository.UserRepository;
import com.example.authservices.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(UserRegistrationDTO userRegistrationDTO) {
        // Verificar si el correo electrónico ya está en uso
        if (userRepository.existsByEmail(userRegistrationDTO.getEmail())) {
            throw new IllegalArgumentException("El correo electrónico ya está en uso");
        }

        // Crear una nueva entidad User desde el DTO
        User user = new User();
        user.setFirstName(userRegistrationDTO.getFirstName());
        user.setLastName(userRegistrationDTO.getLastName());
        user.setAddress(userRegistrationDTO.getAddress());
        user.setEmail(userRegistrationDTO.getEmail());
        user.setBirthDate(userRegistrationDTO.getBirthDate());
        // Encriptar la contraseña antes de almacenarla
        user.setPassword(passwordEncoder.encode(userRegistrationDTO.getPassword()));

        // Guardar el usuario en el repositorio
        return userRepository.save(user);
    }

    public LoginResponseDTO loginUser(UserLoginDTO userLoginDTO) {
        User user = userRepository.findByEmail(userLoginDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (passwordEncoder.matches(userLoginDTO.getPassword(), user.getPassword())) {
            String token = jwtUtil.generateToken(user.getEmail());
            UserDTO userDTO = UserMapper.INSTANCE.userToUserDTO(user);
            return new LoginResponseDTO(token, userDTO);
        } else {
            throw new IllegalArgumentException("Invalid email or password");
        }
    }
}
