package com.codepuran.controller;

import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.codepuran.dto.ClientAndOrderCountDetailsDto;
import com.codepuran.dto.CreateOrderDto;
import com.codepuran.dto.OrderHistoryDto;
import com.codepuran.dto.OrderManageDto;
import com.codepuran.dto.OrderUpdateEvent;
import com.codepuran.entity.Order;
import com.codepuran.service.OrderService;
import com.codepuran.utils.UtilsService;

@RestController
@RequestMapping("/api/order")
public class OrderController {

  @Autowired
  private OrderService orderService;
  
  @Autowired
  private UtilsService utilsService;
  
  @Autowired
  private TokenStore tokenStore;
  
  
  @PostMapping("/create")
  public ResponseEntity<OrderManageDto> createOrder(@RequestBody CreateOrderDto createOrderDto,final OAuth2Authentication auth){
    Map<String, Object> userInfomation = getAdditionalInfoFromToken(auth);
      Order order = orderService.createNewOrder(createOrderDto,userInfomation);
     
      OrderManageDto orderManageDto = new OrderManageDto(order.getId(), order.getProductName(), order.getOrderStatus().name(),
          order.getClient().getId(), order.getClient().getName(),
          utilsService.getDateStringFromLong(order.getCreationDate(), null, "GMT"), order.getCreationDate(), 
          utilsService.getDateStringFromLong(order.getEndDate(), null, "GTM"), order.getEndDate());
      return ResponseEntity.status(HttpStatus.OK).body(orderManageDto);
  }
  
  @GetMapping("/all")
  @ResponseBody
  public List<OrderManageDto> getOrders(){
    return orderService.getOrders("GMT");
  }
  
  @PutMapping("/updatestatus")
  public ResponseEntity<String> replaceEmployee(@RequestBody OrderManageDto orderManageDto,final OAuth2Authentication auth) {
    Map<String, Object> userInfomation = getAdditionalInfoFromToken(auth);
    orderService.updateOrderStatus(orderManageDto.getOrderId(), orderManageDto.getOrderStatus(),userInfomation);
    return new ResponseEntity<>(utilsService.getMessageJson("Status update successfully."), HttpStatus.OK);
  }
  
  @GetMapping("/client/orderdetails")
  @ResponseBody
  public ClientAndOrderCountDetailsDto getUsersByName(@NotEmpty(message = "Client id is required") @Valid @RequestParam Long clientId){
    return orderService.getClientOrderCountDetails(clientId);
  }
  
  
  @GetMapping("/order")
  @ResponseBody
  public Order getOrder(@NotEmpty(message = "Order id is required") @Valid @RequestParam Long orderId){
    return orderService.getOrderById(orderId, "GMT");
  }
  
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteUser(@PathVariable("id") Long id){
    orderService.deleteOrder(id);
    return new ResponseEntity<>(utilsService.getMessageJson("Client deleted successfully."), HttpStatus.OK);
  }
  
  @GetMapping("/timeline")
  @ResponseBody
  public List<OrderUpdateEvent> getOrderTimeLine(@NotEmpty(message = "Order id is required") @Valid @RequestParam Long orderId){
    return orderService.getOrderUpdatesDetails(orderId, "GMT");
  }
  
  @GetMapping("/all/history")
  @ResponseBody
  public List<OrderHistoryDto> getAllOrderHistory(){
    return orderService.getAllOrderHistory("GMT");
  }
  
  private Map<String,Object> getAdditionalInfoFromToken(final OAuth2Authentication auth){
    final OAuth2AuthenticationDetails details = (OAuth2AuthenticationDetails) auth.getDetails();
    final OAuth2AccessToken accessToken = tokenStore.readAccessToken(details.getTokenValue());
    return accessToken.getAdditionalInformation();
  }
  
  
}
