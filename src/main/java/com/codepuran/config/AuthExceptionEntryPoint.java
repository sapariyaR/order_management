package com.codepuran.config;

import com.codepuran.exception.ExceptionResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthExceptionEntryPoint implements AuthenticationEntryPoint {

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
      throws IOException, ServletException {
    ExceptionResponse exceptionResponse = ExceptionResponse.builder()
        .error(true)
        .status(HttpStatus.UNAUTHORIZED.value())
        .message(authException.getMessage())
        .build();
    response.setContentType("application/json");
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    try {
      ObjectMapper mapper = new ObjectMapper();
      mapper.writeValue(response.getOutputStream(), exceptionResponse);
    } catch (Exception e) {
      throw new ServletException();
    }
  }
}
