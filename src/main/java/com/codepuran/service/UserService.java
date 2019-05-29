package com.codepuran.service;

import com.codepuran.entity.User;
import com.codepuran.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder){
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public User createUser(User user){
    return userRepository.saveAndFlush(User.builder()
        .name(user.getName())
        .email(user.getEmail())
        .role(user.getRole())
        .password(passwordEncoder.encode(user.getPassword()))
        .build());
  }

}
