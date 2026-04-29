package com.loken.service;

import com.loken.request.LoginRequest;
import com.loken.request.RegisterRequest;
import com.loken.response.AuthResponse;

public interface IAuthService {
	
	AuthResponse login(LoginRequest request);
	
	AuthResponse register(RegisterRequest request);

}
