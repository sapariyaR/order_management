package com.codepuran.dto;

import java.util.ArrayList;
import java.util.List;
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
public class OrderTimeLine {

  private List<OrderUpdateEvent> orderEvents;
  
  public void pushEvent(OrderUpdateEvent orderUpdateEvent) {
    if(orderEvents == null) {
      orderEvents = new ArrayList<>();
    }
    orderEvents.add(orderUpdateEvent);
  }
}
