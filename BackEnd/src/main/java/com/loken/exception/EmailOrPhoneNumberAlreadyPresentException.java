package com.loken.exception;

public class EmailOrPhoneNumberAlreadyPresentException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;

	public EmailOrPhoneNumberAlreadyPresentException(String msg) {
		super(msg);
	}
	
}
