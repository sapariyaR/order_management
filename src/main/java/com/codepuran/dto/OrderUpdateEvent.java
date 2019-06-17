package com.codepuran.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderUpdateEvent {

  private Long Ud;
  private String UN;
  private String M;
  private String UdS;
  
}
