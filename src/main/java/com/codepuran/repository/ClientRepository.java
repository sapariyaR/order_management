package com.codepuran.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.codepuran.entity.Client;

public interface ClientRepository extends JpaRepository<Client,Long> {

  
}
