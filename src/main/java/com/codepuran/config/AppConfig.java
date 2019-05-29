package com.codepuran.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AppConfig {

  @Bean
  PasswordEncoder bCryptPasswordEncoder(){
    //you cal also implement your own password encoder but this default one is industry standard.
    return new BCryptPasswordEncoder();
  }

}
