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
public class OrderHistoryDto {

  private Long orderId;
  private String productName;
  private String orderStatus;
  private Long clientId;
  private String clientName;
  private String creationDateString;
  private Long creationDate;
  private String endDateString;
  private Long endDate;
  
  private String paymentStatus;
  private String paymentType;
  private Integer numberOfUnit;
  private Double pricePerUnit;
  private Double price;
}
