package com.codepuran.entity;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;
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
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "first_name",nullable=false)
  private String firstName;
  
  @Column(name = "last_name",nullable=false)
  private String lastName;
  
  @Column(name = "email",nullable=false)
  private String email;
  
  @Column(name = "gender",nullable=false)
  private String gender;

  @Column(name = "role",nullable=false)
  private String role;

  @Column(name = "password",nullable=true)
  private String password;
  
  @Transient
  private Long urlGenerationTime;
  
  
  public List<String> getRoles(){
    return null;
  }
}
