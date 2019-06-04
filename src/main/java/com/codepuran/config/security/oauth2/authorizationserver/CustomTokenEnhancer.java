package com.codepuran.config.security.oauth2.authorizationserver;

import com.codepuran.entity.User;
import com.codepuran.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Component
public class CustomTokenEnhancer implements TokenEnhancer {

  @Autowired
  private UserRepository userRepository;

  @Override
  public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
    log.debug("In custom token enhancer");
    final Map<String, Object> additionalInfo = new HashMap<>();
    String userName = authentication.getName();
    Optional<User> user = userRepository.findByEmail(userName);
    if (user.isPresent()) {
      additionalInfo.put("id", user.get().getId());
      additionalInfo.put("first_name", user.get().getFirstName());
      additionalInfo.put("last_name", user.get().getLastName());
      additionalInfo.put("gender", user.get().getGender());
      additionalInfo.put("email", user.get().getEmail());
      additionalInfo.put("role", user.get().getRole());
    }
    ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(additionalInfo);
    return accessToken;
  }
}
