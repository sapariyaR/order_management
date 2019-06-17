package com.codepuran.service;

import javax.persistence.AttributeConverter;
import com.codepuran.dto.OrderTimeLine;
import com.google.gson.Gson;
import com.mysql.cj.util.StringUtils;

public class OrderTimeLineConverter implements AttributeConverter<OrderTimeLine, String>  {

  @Override
  public String convertToDatabaseColumn(OrderTimeLine orderTimeLine) {
    if(orderTimeLine != null) {
      Gson gson = new Gson();
      return gson.toJson(orderTimeLine);
    }
    return null;
  }

  @Override
  public OrderTimeLine convertToEntityAttribute(String orderTimeLine) {
    if(!StringUtils.isNullOrEmpty(orderTimeLine)) {
      Gson gson = new Gson();
      return gson.fromJson(orderTimeLine, OrderTimeLine.class);
    }
    return null;
  }

}
