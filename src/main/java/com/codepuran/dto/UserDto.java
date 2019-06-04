package com.codepuran.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

  private Long id;

  private String name;

  private String role;

  private String email;
  
  private String password;
}
