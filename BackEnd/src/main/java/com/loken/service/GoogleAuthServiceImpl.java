package com.loken.service;

import java.util.Collections;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.loken.entity.AuthProvider;
import com.loken.entity.Role;
import com.loken.entity.Users;
import com.loken.exception.BadRequestException;
import com.loken.repository.IUsersRepository;
import com.loken.request.GoogleLoginRequest;
import com.loken.response.GoogleLoginResponse;
import com.loken.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GoogleAuthServiceImpl implements IGoogleAuthService {
	
	private final IUsersRepository userRepo;
	
	private final JwtUtil jwtUtil;
	
	@Value("${google.client.id}")
	private String googleClientId;

	@Override
	public GoogleLoginResponse googleLogin(GoogleLoginRequest request) {
		GoogleIdToken.Payload payload = verifyGoogleToken(request.getToken());
		
		System.out.println("Google Payload: " + payload);
		
		String email = payload.getEmail();
		
		Users user = userRepo.findByEmail(email)
							.orElseGet(() -> {
								Users newUser = new Users();
								newUser.setEmail(email);
								newUser.setUserName((String) payload.get("name"));
								newUser.setProvider(AuthProvider.GOOGLE);
								newUser.setPassword(null);
								newUser.setRoles(Set.of(Role.USER));
								return userRepo.save(newUser);
							});
		
		String jwtToken = jwtUtil.generateToken(user.getEmail());
		
		return GoogleLoginResponse.builder()
							.email(email)
							.token(jwtToken)
							.userId(user.getId())
							.fullName(user.getUserName())
							.roles(user.getRoles().stream().map(Role::name).toList())
							.build();
	}

	private Payload verifyGoogleToken(String token) {
		try {
			GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
												new NetHttpTransport(),
												GsonFactory.getDefaultInstance())
												.setAudience(Collections.singletonList(googleClientId))
												.build();
			
			GoogleIdToken idToken = verifier.verify(token);
			
			if(idToken == null) {
				throw new BadRequestException("Invalid Google Token");
			}
			
			return idToken.getPayload();
		} catch (Exception e) {
			throw new BadRequestException("Google Authentication Failed");
		}
	}

}
