package com.codepuran.controller;

import com.codepuran.dto.UserDto;
import com.codepuran.entity.User;
import com.codepuran.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

  private final UserService userService;

  UserController(UserService userService){
    this.userService = userService;
  }

  @PostMapping
  public ResponseEntity<User> createUser(@RequestBody User user){
    return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(user));
  }

}
