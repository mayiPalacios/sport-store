package com.example.authservices.handler;

import org.apache.logging.log4j.message.Message;
import org.springframework.http.HttpStatus;

public class AppExceptionHandler extends RuntimeException{
    private final HttpStatus status;

    public AppExceptionHandler(HttpStatus status , String message) {
        super(message);
        this.status = status;
    }

}
