package com.codepuran.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

  @Autowired
  private TokenStore tokenStore;


  @GetMapping("/principal")
  public String getPrincipal() {
    return SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
  }

  @GetMapping("/token-info")
  public Map<String, Object> getUserFromToken(final OAuth2Authentication auth) {
    final OAuth2AuthenticationDetails details = (OAuth2AuthenticationDetails) auth.getDetails();
    final OAuth2AccessToken accessToken = tokenStore.readAccessToken(details.getTokenValue());
    return accessToken.getAdditionalInformation();
  }

  @PreAuthorize("hasAuthority('User')")
  @GetMapping("/user-only")
  public String userOnly() {
    return "User Only";
  }

  @PreAuthorize("hasAuthority('Admin')")
  @GetMapping("/admin-only")
  public String adminOnly() {
    return "Admin Only";
  }
  
}
