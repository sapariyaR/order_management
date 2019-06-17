package com.codepuran.service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.codepuran.dto.ClientAndOrderCountDetailsDto;
import com.codepuran.dto.CreateOrderDto;
import com.codepuran.dto.OrderHistoryDto;
import com.codepuran.dto.OrderManageDto;
import com.codepuran.dto.OrderTimeLine;
import com.codepuran.dto.OrderUpdateEvent;
import com.codepuran.entity.Client;
import com.codepuran.entity.Order;
import com.codepuran.entity.OrderStatus;
import com.codepuran.entity.PaymentStatus;
import com.codepuran.exception.SeedException;
import com.codepuran.repository.ClientRepository;
import com.codepuran.repository.OrderRepository;
import com.codepuran.utils.UtilsService;

@Service
public class OrderService {

  @Autowired
  private OrderRepository orderRepository;
  
  @Autowired
  private UtilsService utilsService;
  
  @Autowired
  private ClientRepository clientRepository;
  
  @Transactional
  public Order createNewOrder(CreateOrderDto order,Map<String, Object> userInfomation) {
    Calendar timeZoneCalendar = utilsService.getTimeZoneCalendar("UTC");
    String message = "Order created.";
    OrderUpdateEvent orderUpdateEvent = 
        new OrderUpdateEvent(timeZoneCalendar.getTimeInMillis(), userInfomation.get("first_name").toString()+" "+userInfomation.get("last_name").toString(), message,null);
    OrderTimeLine timeLine = new OrderTimeLine();
        timeLine.pushEvent(orderUpdateEvent);
    Order newOrder = Order.builder()
        .productName(order.getProductName())
        .productDescription(order.getProductDescription())
        .creationDate(timeZoneCalendar.getTimeInMillis())
        .lastUpdatedDate(timeZoneCalendar.getTimeInMillis())
        .endDate(utilsService.startDateStringToUTCLong(order.getEndDate(), "UTC"))
        .orderStatus(OrderStatus.SUBMITTED)
        .paymentStatus(PaymentStatus.PENDING)
        .client(Client.builder().id(order.getClientId()).name(order.getClientName()).build())
        .paymentType(order.getPaymentType())
        .numberOfUnit(order.getNumberOfUnit())
        .pricePerUnit(order.getPricePerUnit())
        .price(order.getPrice())
        .orderTimeLine(timeLine)
        .build();
    
    return orderRepository.saveAndFlush(newOrder);
  }
  
  @Transactional(readOnly=true)
  public List<OrderManageDto> getOrders(String timeZone){
      List<OrderManageDto> ordersResult = new ArrayList<>();
      List<Object[]> orders = orderRepository.getOrders();
      if(!utilsService.isNullOrEmpty(orders)) {
        for(Object[] eachResult : orders) {
          OrderManageDto orderManageDto = new OrderManageDto();
          orderManageDto.setOrderId(Long.parseLong(eachResult[0].toString()));
          orderManageDto.setProductName(eachResult[1].toString());
          orderManageDto.setOrderStatus(OrderStatus.valueOf(eachResult[2].toString()).name());
          orderManageDto.setClientId(Long.parseLong(eachResult[3].toString()));
          orderManageDto.setClientName(eachResult[4].toString());
          orderManageDto.setCreationDate(Long.parseLong(eachResult[5].toString()));
          orderManageDto.setCreationDateString(utilsService.getDateStringFromLong(orderManageDto.getCreationDate(), null, timeZone));
          orderManageDto.setEndDate(Long.parseLong(eachResult[6].toString()));
          orderManageDto.setEndDateString(utilsService.getDateStringFromLong(orderManageDto.getEndDate(), null, timeZone));
          ordersResult.add(orderManageDto);
        }
      }
      return ordersResult;
  }
  
  @Transactional(readOnly=true)
  public List<OrderHistoryDto> getAllOrderHistory(String timeZone){
      List<OrderHistoryDto> ordersResult = new ArrayList<>();
      List<Object[]> orders = orderRepository.getOrdersWithoutTimeLine();
      if(!utilsService.isNullOrEmpty(orders)) {
        for(Object[] eachResult : orders) {
          OrderHistoryDto orderManageDto = new OrderHistoryDto();
          orderManageDto.setOrderId(Long.parseLong(eachResult[0].toString()));
          orderManageDto.setProductName(eachResult[1].toString());
          orderManageDto.setOrderStatus(OrderStatus.valueOf(eachResult[2].toString()).name());
          orderManageDto.setClientId(Long.parseLong(eachResult[3].toString()));
          orderManageDto.setClientName(eachResult[4].toString());
          orderManageDto.setCreationDate(Long.parseLong(eachResult[5].toString()));
          orderManageDto.setCreationDateString(utilsService.getDateStringFromLong(orderManageDto.getCreationDate(), null, timeZone));
          orderManageDto.setEndDate(Long.parseLong(eachResult[6].toString()));
          orderManageDto.setEndDateString(utilsService.getDateStringFromLong(orderManageDto.getEndDate(), null, timeZone));
          if(eachResult[7] != null) {
            orderManageDto.setPaymentStatus(PaymentStatus.valueOf(eachResult[7].toString()).name());
          }
          orderManageDto.setPaymentType(eachResult[8].toString());
          orderManageDto.setNumberOfUnit(Integer.parseInt(eachResult[9].toString()));
          orderManageDto.setPricePerUnit(Double.parseDouble(eachResult[10].toString()));
          orderManageDto.setPrice(Double.parseDouble(eachResult[11].toString()));
          ordersResult.add(orderManageDto);
        }
      }
      return ordersResult;
  }
  
  @Transactional(readOnly=true)
  public ClientAndOrderCountDetailsDto getClientOrderCountDetails(Long clientId){
     Optional<Client> findById = clientRepository.findById(clientId);
    if(findById.isPresent()) {
      Client client = findById.get();
      Map<String, Integer> intiOrderStatus = new HashMap<>();
      intiOrderStatus.put(OrderStatus.SUBMITTED.name(), 0);
      intiOrderStatus.put(OrderStatus.INPROGRESS.name(), 0);
      intiOrderStatus.put(OrderStatus.HOLD.name(), 0);
      intiOrderStatus.put(OrderStatus.COMPLETED.name(), 0);
      intiOrderStatus.put(OrderStatus.REOPEN.name(), 0);
      
      List<Object[]> orderStatusForClient = orderRepository.getOrderStatusByClientId(clientId);
      if(!utilsService.isNullOrEmpty(orderStatusForClient)) {
        for(Object[] eachObj : orderStatusForClient) {
          if(OrderStatus.valueOf(eachObj[1].toString()).equals(OrderStatus.SUBMITTED)) {
            intiOrderStatus.put(OrderStatus.SUBMITTED.name(), intiOrderStatus.get(OrderStatus.SUBMITTED.name()) + 1);
          }else if(OrderStatus.valueOf(eachObj[1].toString()).equals(OrderStatus.INPROGRESS)) {
            intiOrderStatus.put(OrderStatus.INPROGRESS.name(), intiOrderStatus.get(OrderStatus.INPROGRESS.name()) + 1);
          }else if(OrderStatus.valueOf(eachObj[1].toString()).equals(OrderStatus.HOLD)) {
            intiOrderStatus.put(OrderStatus.HOLD.name(), intiOrderStatus.get(OrderStatus.HOLD.name()) + 1);
          }else if(OrderStatus.valueOf(eachObj[1].toString()).equals(OrderStatus.COMPLETED)) {
            intiOrderStatus.put(OrderStatus.COMPLETED.name(), intiOrderStatus.get(OrderStatus.COMPLETED.name()) + 1);
          }else if(OrderStatus.valueOf(eachObj[1].toString()).equals(OrderStatus.REOPEN)) {
            intiOrderStatus.put(OrderStatus.REOPEN.name(), intiOrderStatus.get(OrderStatus.REOPEN.name()) + 1);
          }
        }
      }
      return new ClientAndOrderCountDetailsDto(client.getId(), client.getName(), client.getEmail(),client.getComment(),client.getDegreeOfPriority().name() ,intiOrderStatus);
      
    }else {
      throw new SeedException("Unable to find Customer.");
    }
   
  }
  
  @Transactional(readOnly=true)
  public List<Order> getOrdersByClientId(Long clientId){
    return orderRepository.getOrdersByClientId(clientId);
  }
  
  @Transactional
  public void updateOrderStatus(Long orderId, String status, Map<String, Object> userInfomation) {
    OrderTimeLine orderTimeLineObj = null;
    List<Object[]> orderTimeLine = orderRepository.getOrderTimeLine(orderId);
    if (!utilsService.isNullOrEmpty(orderTimeLine) && orderTimeLine.get(0)[1] != null) {
      orderTimeLineObj = (OrderTimeLine) orderTimeLine.get(0)[1];
    }
    if (orderTimeLineObj == null) {
      orderTimeLineObj = new OrderTimeLine();
    }
    Calendar timeZoneCalendar = utilsService.getTimeZoneCalendar("UTC");
    String message = "Order status updated to " + status;
    OrderUpdateEvent orderUpdateEvent =
        new OrderUpdateEvent(timeZoneCalendar.getTimeInMillis(), userInfomation.get("first_name").toString() + " " + userInfomation.get("last_name").toString(), message,null);
    orderTimeLineObj.pushEvent(orderUpdateEvent);
    orderRepository.updateOrderStatus(OrderStatus.valueOf(status), timeZoneCalendar.getTimeInMillis(), orderId, orderTimeLineObj);
  }
  
  @Transactional(readOnly=true)
  public Order getOrderById(Long orderId,String timeZone) {
    Optional<Order> findById = orderRepository.findById(orderId);
    if(findById.isPresent()) {
      Order order = findById.get();
      order.setEndDateString(utilsService.getDateStringFromLong(order.getEndDate(), null, timeZone));
      order.setCreationDateString(utilsService.getDateStringFromLong(order.getCreationDate(), null, timeZone));
      order.setLastUpdatedDateString(utilsService.getDateStringFromLong(order.getLastUpdatedDate(), null, timeZone));
      Calendar timeZoneCalendar = utilsService.getTimeZoneCalendar(timeZone);
      Calendar currentTImeCal = utilsService.getTimeZoneCalendar(timeZone);
      timeZoneCalendar.setTimeInMillis(order.getEndDate());
      LocalDate endDateLocal = Instant.ofEpochMilli(timeZoneCalendar.getTimeInMillis()).atZone(ZoneId.of(timeZone)).toLocalDate();
      LocalDate currentDateLocal = Instant.ofEpochMilli(currentTImeCal.getTimeInMillis()).atZone(ZoneId.of(timeZone)).toLocalDate();
      long noOfDaysBetween = ChronoUnit.DAYS.between(currentDateLocal, endDateLocal);
      if(noOfDaysBetween >= 0) {
        order.setDayLeft(noOfDaysBetween);
      }
      return order;
    }
    throw new SeedException("Unable to find Order.");
  }
  
  @Transactional
  public void deleteOrder(Long orderId) {
    orderRepository.deleteById(orderId);
  }
  
  @Transactional(readOnly=true)
  public List<OrderUpdateEvent> getOrderUpdatesDetails(Long orderId,String timeZone) {
    List<OrderUpdateEvent> orderUpdateEvents = new ArrayList<>();
    List<Object[]> orderTimeLine = orderRepository.getOrderTimeLine(orderId);
    if (!utilsService.isNullOrEmpty(orderTimeLine) && orderTimeLine.get(0)[1] != null) {
      OrderTimeLine orderTimeLineObj = (OrderTimeLine) orderTimeLine.get(0)[1];
      orderUpdateEvents.addAll(orderTimeLineObj.getOrderEvents());
    }
    for(OrderUpdateEvent orderUpdateEvent : orderUpdateEvents) {
      orderUpdateEvent.setUdS(utilsService.getDateStringFromLong(orderUpdateEvent.getUd(), "dd MMM yyyy hh:mm a", timeZone));
    }
    return orderUpdateEvents;
  }

}
