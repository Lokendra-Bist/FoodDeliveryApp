package com.loken.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import com.loken.entity.Users;
import com.loken.request.RegisterRequest;
import com.loken.response.AuthResponse;

public class UserMapper {
	
	public static Users toEntity(RegisterRequest request) {
		Users user = new Users();
		user.setUserName(request.getUserName());
		user.setEmail(request.getEmail());
		user.setPhoneNumber(request.getPhoneNumber());
		user.setPassword(request.getPassword());
		return user;
	}
	
	public static AuthResponse toResponse(Users user, String token, String msg) {
		Set<String> roles = user.getRoles()
								.stream()
								.map(role -> role.name())
								.collect(Collectors.toSet());
		return new AuthResponse(token, user.getEmail(), roles, msg);
	}

}
