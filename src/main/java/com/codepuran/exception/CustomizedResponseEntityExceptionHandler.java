package com.codepuran.exception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(Exception.class)
  public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
    ExceptionResponse exceptionResponse =
        ExceptionResponse.builder()
            .error(true)
            .message("We are facing some strange issue please try again.")
            .details(ex.getMessage())
            .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
            .build();
    log.error("Error", ex);
    return new ResponseEntity<>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(SeedException.class)
  public final ResponseEntity<ExceptionResponse> handleCustomException(
      SeedException e, WebRequest request) {
    ExceptionResponse exceptionResponse =
        ExceptionResponse.builder()
            .error(true)
            .message(e.getMessage())
            .status(e.getStatus())
            .build();
    log.error(e.getMessage(), e);
    if (e.getStatus() == 0) {
      return new ResponseEntity<ExceptionResponse>(
          exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<ExceptionResponse>(
        exceptionResponse, HttpStatus.valueOf(e.getStatus()));
  }
}
