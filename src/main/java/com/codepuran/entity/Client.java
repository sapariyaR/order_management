package com.codepuran.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
public class Client {

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  
  @Column(name="email",nullable=false, unique=true)
  private String email;
  
  @Column(name = "first_name",nullable=false, length=50)
  private String name;
  
  @Column(name="priority", nullable=false,length=5)
  private DegreeOfPriority degreeOfPriority;
  
  @Column(name="comment",length=1000, nullable=true)
  private String comment;
  
  @Column(name="we_chat",nullable=true)
  private String weChat;
  
  
  
}
