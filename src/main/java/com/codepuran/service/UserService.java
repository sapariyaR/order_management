package com.codepuran.service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.codepuran.entity.User;
import com.codepuran.exception.SeedException;
import com.codepuran.repository.UserRepository;
import com.codepuran.utils.UtilsService;
import com.google.gson.Gson;
import com.mysql.cj.util.StringUtils;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  
  @Autowired
  private UtilsService utilsService;

  public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder){
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Transactional
  public User createUser(User user){
    return userRepository.saveAndFlush(User.builder()
        .firstName(user.getFirstName())
        .lastName(user.getLastName())
        .gender(user.getGender())
        .email(user.getEmail())
        .role(user.getRole())
        .password(!StringUtils.isNullOrEmpty(user.getPassword()) ? passwordEncoder.encode(user.getPassword()) : "")
        .build());
  }
  
  public User updateUser(User user) {
    Optional<User> existingUser = userRepository.findById(user.getId());
    if(existingUser.isPresent()) {
      return userRepository.saveAndFlush(User.builder()
          .id(user.getId())
          .firstName(user.getFirstName())
          .lastName(user.getLastName())
          .gender(user.getGender())
          .email(user.getEmail())
          .role(user.getRole())
          .password(existingUser.get().getPassword())
          .build());
    }
    throw new SeedException("Unable to find user.");
  }
  
  @Transactional(readOnly=true)
  public List<User> getAllUser(){
    return userRepository.findAll();
  }
  
  @Transactional(readOnly=true)
  public List<User> getUserByName(String name){
    List<User> users = null;
   List<Object[]> userObj = userRepository.findUsersByName(name);
   if(!utilsService.isNullOrEmpty(userObj)) {
     users = new ArrayList<>();
     for(Object[] eachObj : userObj) {
      User user = User.builder().id(Long.parseLong(eachObj[0].toString()))
       .firstName(eachObj[1].toString())
       .lastName(eachObj[2].toString())
       .email(eachObj[3].toString()).build();
      users.add(user);
     }
   }
   return users;
  }
   
  @Transactional
  public Integer updateUserPassword(Long userId, String password) {
    return userRepository.updateUserPassword(passwordEncoder.encode(password), userId);
  }
  
  @Transactional
  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
  
  public User getUserById(Long id) {
    Optional<User> findById = userRepository.findById(id);
    if(findById.isPresent()) {
      return findById.get();
    }
    throw new SeedException("Unable to find user.");
  }
  
  
  @Transactional(readOnly=true)
  public User validateToken(String token) {
    User decodedUser = decodeUser(token);
    if(decodedUser == null) {
      return null;
    }
    Long currentTime = utilsService.getUTCCalendar().getTimeInMillis();
    if(currentTime - decodedUser.getUrlGenerationTime() <= 24*216000) {
      Optional<User> findByEmail = userRepository.findByEmail(decodedUser.getEmail());
      if(findByEmail.isPresent()) {
        return findByEmail.get();
      }
      throw new SeedException("Unable to find User.");
    }
    throw new SeedException("Your link has expired.");
  }
  
  public String encodeUser(User user) {
    User buildedUser = User.builder().email(user.getEmail()).urlGenerationTime(Calendar.getInstance(TimeZone.getTimeZone("UTC")).getTimeInMillis())
    .build();
    String userString = new Gson().toJson(buildedUser);
    return Base64.getEncoder().encodeToString(userString.getBytes());
  }
  
  private User decodeUser(String userToken) {
    byte[] actualByte = Base64.getDecoder().decode(userToken);
    String actualString = new String(actualByte);
    User user = null;
    try {
      user = new Gson().fromJson(actualString, User.class);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return user;
  }

}
