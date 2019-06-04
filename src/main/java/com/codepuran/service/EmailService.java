package com.codepuran.service;

import java.util.HashMap;
import java.util.Map;
import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import com.codepuran.entity.User;
import freemarker.template.Configuration;
import freemarker.template.Template;

@Service
public class EmailService {
  
  @Value("${com.codepuran.client.host.url}")
  private String clientHost;
  
  @Autowired
  JavaMailSender sender;
  
  @Autowired
  private Configuration freemarkerConfig;
  
  public void sendInvitationLink(String token, User user) {
    try {
      MimeMessage message = sender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message);
      Map<String, Object> model = new HashMap<>();
      model.put("user", user.getFirstName()+" "+user.getLastName());
      String tokenUrl = clientHost+"/verify-user/"+token;
      model.put("token", tokenUrl);
      freemarkerConfig.setClassForTemplateLoading(this.getClass(), "/template");
      Template t = freemarkerConfig.getTemplate("invitation.vm");
      String text = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
      helper.setTo(user.getEmail());
      helper.setText(text, true);
      helper.setSubject("Invitation Link");
      sender.send(message);
    }catch(Exception e) {
      e.printStackTrace();
    }
  }
  
}
