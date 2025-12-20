package com.loken.exception;

public class InvalidDiscountPriceException extends RuntimeException {

    private static final long serialVersionUID = 1L;

	public InvalidDiscountPriceException(String msg) {
        super(msg);
    }
}