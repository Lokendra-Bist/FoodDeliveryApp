package com.loken.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                ex.getMessage()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

	@ExceptionHandler(EmailOrPhoneNumberAlreadyPresentException.class)
	public ResponseEntity<ErrorResponse> emailPhoneNumberAlreadyExistException(EmailOrPhoneNumberAlreadyPresentException ex) {
		 ErrorResponse errorResponse = new ErrorResponse(
	                LocalDateTime.now(),
	                HttpStatus.CONFLICT.value(),
	                HttpStatus.CONFLICT.getReasonPhrase(),
	                ex.getMessage()
	        );
		 return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(PhotoProcessingException.class)
	public ResponseEntity<ErrorResponse> photoProcessingException(PhotoProcessingException ex) {
		 ErrorResponse errorResponse = new ErrorResponse(
	                LocalDateTime.now(),
	                HttpStatus.CONFLICT.value(),
	                HttpStatus.CONFLICT.getReasonPhrase(),
	                ex.getMessage()
	        );
		 return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(InvalidDiscountPriceException.class)
	public ResponseEntity<ErrorResponse> invalidDisPriceException(InvalidDiscountPriceException ex) {
		 ErrorResponse errorResponse = new ErrorResponse(
	                LocalDateTime.now(),
	                HttpStatus.CONFLICT.value(),
	                HttpStatus.CONFLICT.getReasonPhrase(),
	                ex.getMessage()
	        );
		 return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorResponse> rnfException(ResourceNotFoundException ex) {
		 ErrorResponse errorResponse = new ErrorResponse(
	                LocalDateTime.now(),
	                HttpStatus.CONFLICT.value(),
	                HttpStatus.CONFLICT.getReasonPhrase(),
	                ex.getMessage()
	        );
		 return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(ResourceAlreadyExistsException.class)
	public ResponseEntity<ErrorResponse> resourceAlreadyExistException(ResourceAlreadyExistsException ex) {
		 ErrorResponse errorResponse = new ErrorResponse(
	                LocalDateTime.now(),
	                HttpStatus.CONFLICT.value(),
	                HttpStatus.CONFLICT.getReasonPhrase(),
	                ex.getMessage()
	        );
		 return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
	}
	
}
