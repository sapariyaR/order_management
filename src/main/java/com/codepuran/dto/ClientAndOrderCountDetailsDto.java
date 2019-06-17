package com.codepuran.dto;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@ToString
@Getter
@Setter
public class ClientAndOrderCountDetailsDto {

  private Long id;
  private String name;
  private String email;
  private String about;
  private String priority;
  private Map<String, Integer> orderDetails;
}
