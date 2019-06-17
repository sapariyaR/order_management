package com.codepuran.entity;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import com.codepuran.dto.OrderTimeLine;
import com.codepuran.service.OrderTimeLineConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="client_order")
public class Order {
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name="id")
  private Long id;
  
  @Column(name = "product_name",nullable=false, length=50)
  private String productName;
  
  @Column(name = "product_description", length=1000)
  private String productDescription;
  
  @Column(name = "creation_date",nullable=false)
  private Long creationDate;
  
  @Column(name = "last_updated_date",nullable=false)
  private Long lastUpdatedDate;
  
  @Column(name = "end_date",nullable=false)
  private Long endDate;
  
  @Column(name = "order_status",nullable=false)
  @Enumerated(EnumType.ORDINAL)
  private OrderStatus orderStatus;
  
  @Column(name = "number_of_unit",nullable=false)
  private Integer numberOfUnit;
  
  @Column(name = "price_per_unit",nullable=false)
  private Double pricePerUnit;
  
  @Column(name = "price",nullable=false)
  private Double price;
  
  @Column(name = "payment_type",nullable=false)
  private String paymentType;
  
  @Column(name = "payment_status")
  @Enumerated(EnumType.ORDINAL)
  private PaymentStatus paymentStatus;
  
  @ManyToOne()
  @JoinColumn(name="client_id", referencedColumnName="id")
  private Client client;
  
  @Convert(converter = OrderTimeLineConverter.class)
  @Column(name = "order_timeLine", nullable=false,length=10000)
  private OrderTimeLine orderTimeLine;
  
  @Transient
  private String creationDateString;
  
  @Transient
  private String endDateString;
  
  @Transient
  private String lastUpdatedDateString;
  
  @Transient
  private Long dayLeft;
}
