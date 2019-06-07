package com.codepuran.controller;

import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.codepuran.dto.UserDto;
import com.codepuran.entity.User;
import com.codepuran.service.EmailService;
import com.codepuran.service.UserService;
import com.codepuran.utils.UtilsService;

@RestController
@RequestMapping("/api/user")
//@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "Authorization, Content-Type, xsrf-token")
public class UserController {

  private final UserService userService;
  
  @Autowired
  private EmailService emailService;

  UserController(UserService userService){
    this.userService = userService;
  }

  @PostMapping("/create")
  public ResponseEntity<User> createUser(@RequestBody User user){
    if(user.getId() != null) {
      User updatedUser = userService.updateUser(user);
      return ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedUser);
    }else {
      User createUser = userService.createUser(user);
      String encodeUser = userService.encodeUser(createUser);
      new Thread(() -> emailService.sendInvitationLink(encodeUser, createUser)).start();
      return ResponseEntity.status(HttpStatus.CREATED).body(createUser);
    }
   
  }
  
  @PostMapping("/resetpassword")
  public ResponseEntity<String> reSetPassword(@RequestBody UserDto userDto){
    userService.updateUserPassword(userDto.getId(),userDto.getPassword());
    return new ResponseEntity<>(UtilsService.getMessageJson("Password saved successfully."), HttpStatus.OK);
  }
  
  @GetMapping("/all")
  @ResponseBody
  public List<User> getAllUsers(){
    return userService.getAllUser();
  }
  
  @GetMapping("/all/name")
  @ResponseBody
  public List<User> getUsersByName(@NotEmpty(message = "Name id is required") @Valid @RequestParam String name){
    return userService.getUserByName(name);
  }
  
  @GetMapping("/token/validate")
  public ResponseEntity<Object> getUserByLinkToken(@NotEmpty(message = "Token is required") @Valid @RequestParam String token) {
     User user = userService.validateToken(token);
     return ResponseEntity.status(HttpStatus.OK).body(user);
  }
  
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteUser(@PathVariable("id") Long id){
      userService.deleteUser(id);
      return new ResponseEntity<>(UtilsService.getMessageJson("User deleted successfully."), HttpStatus.OK);
  }
  
  @GetMapping("/sendinvitation")
  public ResponseEntity<String> sendInvitation(@NotEmpty(message = "Name id is required") @Valid @RequestParam("id") Long id) {
    User user = userService.getUserById(id);
    String encodeUser = userService.encodeUser(user);
    new Thread(() ->emailService.sendInvitationLink(encodeUser, user)).start();
    return new ResponseEntity<>(UtilsService.getMessageJson("invitation sent successfully."), HttpStatus.OK);
  }

}
