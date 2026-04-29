package com.loken.service;

import java.util.Set;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.loken.entity.Role;
import com.loken.entity.Users;
import com.loken.exception.BadRequestException;
import com.loken.exception.ResourceAlreadyExistsException;
import com.loken.exception.ResourceNotFoundException;
import com.loken.mapper.UserMapper;
import com.loken.repository.IUsersRepository;
import com.loken.request.LoginRequest;
import com.loken.request.RegisterRequest;
import com.loken.response.AuthResponse;
import com.loken.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {

	private final AuthenticationManager authenticationManager;

	private final IUsersRepository userRepo;

	private final JwtUtil jwtUtil;
	
	private final PasswordEncoder passwordEncoder;

	@Override
	public AuthResponse login(LoginRequest request) {
		try {
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
			Users user = userRepo.findByEmail(request.getEmail())
					.orElseThrow(() -> new ResourceNotFoundException("User not found!"));

			String token = jwtUtil.generateToken(request.getEmail());
			return UserMapper.toResponse(user, token, "Login Successful!");
		} catch (BadCredentialsException e) {
			throw new BadRequestException("Invalid email or password");
		}
	}

	@Override
	public AuthResponse register(RegisterRequest request) {
		if (userRepo.findByEmail(request.getEmail()).isPresent()) {
			throw new ResourceAlreadyExistsException("Email already exists");
		}
		
		if (userRepo.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
		    throw new ResourceAlreadyExistsException("Phone number already exists");
		}
		
		Users user = UserMapper.toEntity(request);
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setRoles(Set.of(Role.USER));
		userRepo.save(user);
				
		String token = jwtUtil.generateToken(request.getEmail());
		return UserMapper.toResponse(user, token, "Registered Successfully!");
	}

}
