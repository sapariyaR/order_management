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
public class OrderManageDto {

  private Long orderId;
  private String productName;
  private String orderStatus;
  private Long clientId;
  private String clientName;
  private String creationDateString;
  private Long creationDate;
  private String endDateString;
  private Long endDate;
}
