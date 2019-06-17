package com.codepuran.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.codepuran.dto.OrderTimeLine;
import com.codepuran.entity.Order;
import com.codepuran.entity.OrderStatus;

public interface OrderRepository extends JpaRepository<Order,Long> {

  @Query("Select o from Order o where o.client.id = :clientId")
  List<Order> getOrdersByClientId(@Param("clientId") Long clientId);
  
  @Query("Select o from Order o where o.client.id = :clientId AND o.orderStatus IN (:orderStatus)")
  List<Order> getOrderByClientIdAndStatus(@Param("clientId") Long clientId, @Param("orderStatus") List<OrderStatus> orderStatus);
  
  @Query("Select o.id, o.orderStatus, o.client.id from Order o where o.client.id = :clientId")
  List<Object[]> getOrderStatusByClientId(@Param("clientId") Long clientId);
  
  @Modifying
  @Query("update Order o set o.orderStatus = :orderStatus, o.lastUpdatedDate = :updatedTime, o.orderTimeLine = :timeLineData WHERE o.id = :id")
  int updateOrderStatus(@Param("orderStatus") OrderStatus orderStatus,
      @Param("updatedTime") Long updatedTime,
      @Param("id") Long id,
      @Param("timeLineData") OrderTimeLine orderTimeLine);
  
  @Query("Select o.id, o.productName ,o.orderStatus, o.client.id, o.client.name, o.creationDate, o.endDate from Order o")
  List<Object[]> getOrders();
  
  @Query("Select o.id, o.orderTimeLine from Order o where o.id = :orderId")
  List<Object[]> getOrderTimeLine(@Param("orderId") Long orderId);
  
  @Query("Select o.id, o.productName ,o.orderStatus, o.client.id, o.client.name, o.creationDate, "
      + "o.endDate, o.paymentStatus, o.paymentType, o.numberOfUnit, o.pricePerUnit, o.price from Order o ORDER BY o.creationDate ASC")
  List<Object[]> getOrdersWithoutTimeLine();
}
