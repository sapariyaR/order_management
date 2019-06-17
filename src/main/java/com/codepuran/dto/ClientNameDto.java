package com.codepuran.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@ToString
@Getter
@Setter
public class ClientNameDto {

  private Long id;
  private String name;
  private String email;
}
