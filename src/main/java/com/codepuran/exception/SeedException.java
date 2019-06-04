package com.codepuran.exception;

public class SeedException extends RuntimeException {
    private static final long serialVersionUID = 3214139495765355085L;

    private String message = null;
    private Throwable cause;
    private Integer status;

    public SeedException() {
        super();
    }

    public SeedException(String message) {
        super(message);
        this.message = message;
    }

    public SeedException(Throwable cause) {
        super(cause);
        this.cause = cause;
    }

    public SeedException(String message, Throwable cause) {
        super(message, cause);
        this.message = message;
        this.cause = cause;
    }
    
    public SeedException(Integer status,String message, Throwable cause) {
      super(message, cause);
      this.message = message;
      this.cause = cause;
      this.status = status;
  }

    @Override
    public String toString() {
        return message;
    }

    @Override
    public String getMessage() {
        String errorMessage = "";
        if (this.message != null) {
            errorMessage += this.message;
        }
        if (this.cause != null) {
            errorMessage += this.cause.getMessage();
        }
        return errorMessage;
    }

    public int getStatus() {
      return this.status;
    }
}
