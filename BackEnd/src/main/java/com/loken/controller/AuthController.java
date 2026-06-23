package com.loken.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.loken.request.GoogleLoginRequest;
import com.loken.request.LoginRequest;
import com.loken.request.RegisterRequest;
import com.loken.response.AuthResponse;
import com.loken.response.GoogleLoginResponse;
import com.loken.service.IAuthService;
import com.loken.service.IGoogleAuthService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final IAuthService authService;
	
	private final IGoogleAuthService googleAuthService;

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
		return ResponseEntity.ok(authService.login(request));
	}

	@PostMapping("/register")
	public ResponseEntity<AuthResponse> registerUser(@RequestBody RegisterRequest request) {
		return ResponseEntity.ok(authService.register(request));
	}
	
	@PostMapping("/google-login")
	public ResponseEntity<GoogleLoginResponse> googleLogin(@RequestBody GoogleLoginRequest request) {
		return ResponseEntity.ok(googleAuthService.googleLogin(request));
	}

}
