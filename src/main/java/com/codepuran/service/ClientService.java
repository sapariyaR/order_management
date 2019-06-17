package com.codepuran.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.codepuran.dto.ClientCountDto;
import com.codepuran.dto.ClientNameDto;
import com.codepuran.entity.Client;
import com.codepuran.entity.DegreeOfPriority;
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
        .id(client.getId() != null ? client.getId() : null)
        .email(client.getEmail())
        .name(client.getName())
        .degreeOfPriority(client.getDegreeOfPriority())
        .comment(!StringUtils.isNullOrEmpty(client.getComment()) ? client.getComment() : "")
        .weChat(!StringUtils.isNullOrEmpty(client.getWeChat()) ? client.getWeChat() : "").build());
    
  }
  
  @Transactional(readOnly=true)
  public List<Client> getClientByPriority(List<DegreeOfPriority> degreeOfPriorities){
    return clientRepository.findClientsByPriorities(degreeOfPriorities);
  }
  
  @Transactional(readOnly=true)
  public ClientCountDto getClientCountDetails() {
    ClientCountDto clientCountDto = new ClientCountDto();
    List<Object[]> clientIdAndPriority = clientRepository.getClientIdAndPriority();
    if(!utilsService.isNullOrEmpty(clientIdAndPriority)) {
      clientCountDto.setTotalClient(clientIdAndPriority.size());
      for(Object[] eachObject : clientIdAndPriority) {
        if(DegreeOfPriority.valueOf(eachObject[1].toString()).equals(DegreeOfPriority.HIGH)) {
          clientCountDto.setHighPriorityClien(clientCountDto.getHighPriorityClien() + 1);
        }else if(DegreeOfPriority.valueOf(eachObject[1].toString()).equals(DegreeOfPriority.MEDIUM)) {
          clientCountDto.setMediumPriorityClient(clientCountDto.getMediumPriorityClient() + 1);
        }else {
          clientCountDto.setLowPriorityClient(clientCountDto.getLowPriorityClient() + 1);
        }
      }
    }
    return clientCountDto;
  }
  
  @Transactional
  public void deleteClient(Long id) {
    clientRepository.deleteById(id);
  }
  
  public List<ClientNameDto> getClientByName(String name){
    return clientRepository.getClientByName(name);
  }
  
  
}
