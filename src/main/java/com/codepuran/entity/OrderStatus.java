package com.codepuran.entity;

public enum OrderStatus {

  SUBMITTED(0), INPROGRESS(1), COMPLETED(2), HOLD(3), REOPEN(4);

  private Integer value;

  private OrderStatus(int value) {
    this.value = value;
  }

  public Integer getOrderStatus() {
    return this.value;
  }
}
