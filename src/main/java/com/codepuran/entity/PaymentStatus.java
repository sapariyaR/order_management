package com.codepuran.entity;

public enum PaymentStatus {

  DONE(0),
  PENDING(1);
  
  private Integer value;

  private PaymentStatus(int value) {
    this.value = value;
  }

  public Integer getPaymentStatus() {
    return this.value;
  }
}
