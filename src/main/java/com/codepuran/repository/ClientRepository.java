package com.codepuran.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.codepuran.dto.ClientNameDto;
import com.codepuran.entity.Client;
import com.codepuran.entity.DegreeOfPriority;

public interface ClientRepository extends JpaRepository<Client,Long> {

  @Query("Select c from Client c where c.degreeOfPriority IN (:degreeOfPriorities)")
  List<Client> findClientsByPriorities(List<DegreeOfPriority> degreeOfPriorities);
  
  @Query("Select c.id, c.degreeOfPriority from Client c")
  List<Object[]> getClientIdAndPriority();
  
  
  @Query("SELECT new com.codepuran.dto.ClientNameDto(c.id,c.name,c.email) FROM Client c WHERE c.name LIKE %:name%") 
  List<ClientNameDto> getClientByName(@Param("name")String name); 
}
