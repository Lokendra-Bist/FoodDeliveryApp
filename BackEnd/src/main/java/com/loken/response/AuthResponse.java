package com.loken.response;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
	
	private String token;
	
	private String email;
	
	private Set<String> roles;
	
	private String message;

}
