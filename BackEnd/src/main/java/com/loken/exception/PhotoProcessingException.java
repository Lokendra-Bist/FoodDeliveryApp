package com.loken.exception;

public class PhotoProcessingException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;

	public PhotoProcessingException(String msg) {
		super(msg);
	}
	
}
