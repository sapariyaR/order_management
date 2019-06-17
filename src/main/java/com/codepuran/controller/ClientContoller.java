package com.codepuran.controller;

import java.util.Arrays;
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
import com.codepuran.dto.ClientCountDto;
import com.codepuran.dto.ClientNameDto;
import com.codepuran.entity.Client;
import com.codepuran.entity.DegreeOfPriority;
import com.codepuran.service.ClientService;
import com.codepuran.utils.UtilsService;
import com.mysql.cj.util.StringUtils;

@RestController
@RequestMapping("/api/client")
public class ClientContoller {

  @Autowired
  private ClientService clientService;
  
  @Autowired
  private UtilsService utilsService;
  
  @PostMapping("/create")
  public ResponseEntity<Client> createUser(@RequestBody Client client){
      Client createdClient = clientService.createClient(client);
      return ResponseEntity.status(HttpStatus.OK).body(createdClient);
  }
  
  @GetMapping("/count")
  public ClientCountDto getClientCount() {
    return clientService.getClientCountDetails();
  }
  
  @GetMapping("/all")
  public List<Client> getClientByPriority(@RequestParam String priority){
    List<DegreeOfPriority> degreeOfPriorities = null;
    if(StringUtils.isNullOrEmpty(priority)) {
      degreeOfPriorities = Arrays.asList(DegreeOfPriority.HIGH,DegreeOfPriority.MEDIUM, DegreeOfPriority.LOW);
    }else {
      degreeOfPriorities = Arrays.asList(DegreeOfPriority.valueOf(priority));
    }
    return clientService.getClientByPriority(degreeOfPriorities);
  }
  
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteUser(@PathVariable("id") Long id){
      clientService.deleteClient(id);
      return new ResponseEntity<>(utilsService.getMessageJson("Client deleted successfully."), HttpStatus.OK);
  }
  
  @GetMapping("/all/name")
  @ResponseBody
  public List<ClientNameDto> getClientByName(@NotEmpty(message = "Name is required") @Valid @RequestParam String name){
    return clientService.getClientByName(name);
  }
  
}
