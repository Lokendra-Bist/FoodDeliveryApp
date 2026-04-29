package com.loken.request;

import lombok.Data;

@Data
public class RegisterRequest {
	
	private String userName;
	
	private String email;
	
	private String phoneNumber;
	
	private String password;

}
