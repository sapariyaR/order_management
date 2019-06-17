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
public class CreateOrderDto {
  private Long id;
  private String productName;
  private String productDescription;
  private String endDate;
  private Integer numberOfUnit;
  private Double pricePerUnit;
  private Double price;
  private String paymentType;
  private Long clientId;
  private String clientName;
}
