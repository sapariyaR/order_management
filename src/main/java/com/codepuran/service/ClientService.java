package com.codepuran.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.codepuran.entity.Client;
import com.codepuran.repository.ClientRepository;
import com.codepuran.utils.UtilsService;
import com.mysql.cj.util.StringUtils;

@Service
public class ClientService {

  @Autowired
  private UtilsService utilsService;
  
  @Autowired
  private ClientRepository clientRepository;
  
  @Transactional
  public Client createClient(Client client){
    return clientRepository.saveAndFlush(Client.builder()
        .email(client.getEmail())
        .name(client.getName())
        .degreeOfPriority(client.getDegreeOfPriority())
        .comment(!StringUtils.isNullOrEmpty(client.getComment()) ? client.getComment() : "")
        .weChat(!StringUtils.isNullOrEmpty(client.getWeChat()) ? client.getWeChat() : "").build());
    
  }
}
