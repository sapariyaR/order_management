package com.codepuran.config.security;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.codepuran.repository.UserRepository;
import com.codepuran.utils.UtilsService;
import com.mysql.cj.util.StringUtils;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

  @Autowired private UserRepository userRepository;
  @Autowired private PasswordEncoder passwordEncoder;
  
  @Autowired
  private UtilsService utilsService;

  public CustomAuthenticationProvider() {
    super();
  }

  @Override
  public Authentication authenticate(final Authentication authentication)
      throws AuthenticationException {

    final String name = authentication.getName();
    String password = authentication.getCredentials().toString();
    passwordEncoder.encode(password);
    Optional<com.codepuran.entity.User> user = userRepository.findByEmail(name);
    if (user.isPresent() ) {
      if(StringUtils.isNullOrEmpty(user.get().getPassword())) {
        throw new AuthenticationCredentialsNotFoundException("Authentication information is not available, contact you Admin.");
      }
      if(passwordEncoder.matches(password, user.get().getPassword())) {
        List<SimpleGrantedAuthority> roles = new ArrayList<>();
        List<String> roleList = utilsService.getListFromCommaSeparated(user.get().getRole());
        roleList.forEach(item->{
          roles.add(new SimpleGrantedAuthority(item));
        });
        final UserDetails principal = new User(name, password, roles);
        final Authentication auth =
            new UsernamePasswordAuthenticationToken(principal, password, roles);
        log.debug("User authenticated with custom authenticator");
        return auth;
      }else {
        throw new AuthenticationCredentialsNotFoundException("Password you have entered is incorrect.");
      }
      
    } else {
      throw new AuthenticationCredentialsNotFoundException("User Not Found");
    }
  }

  @Override
  public boolean supports(final Class<?> authentication) {
    return authentication.equals(UsernamePasswordAuthenticationToken.class);
  }
}
