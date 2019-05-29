package com.codepuran.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class AccessTokenUtil {

  @Autowired
  private TokenStore tokenStore;

  public String getAccessToken(OAuth2Authentication auth) {
    final OAuth2AuthenticationDetails details = (OAuth2AuthenticationDetails) auth.getDetails();
    final OAuth2AccessToken accessToken = tokenStore.readAccessToken(details.getTokenValue());
    return accessToken.toString();
  }

  Map<String, Object> getUserInfo(OAuth2Authentication auth) {
    final OAuth2AuthenticationDetails details = (OAuth2AuthenticationDetails) auth.getDetails();
    final OAuth2AccessToken accessToken = tokenStore.readAccessToken(details.getTokenValue());
    return accessToken.getAdditionalInformation();
  }
}
