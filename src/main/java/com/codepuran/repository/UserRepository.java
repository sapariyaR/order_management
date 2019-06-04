package com.codepuran.repository;

import com.codepuran.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

  Optional<User> findByEmail(String email);
  
  @Modifying
  @Query("update User u set u.password = :password where u.id = :id")
  int updateUserPassword(@Param("password") String password, @Param("id") Long id);

  @Query("Select u.id, u.firstName, u.lastName, u.email from User u where u.firstName LIKE %:name% OR u.lastName LIKE %:name%")
  List<Object[]> findUsersByName(@Param("name")String name);
}
