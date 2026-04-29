package com.loken.security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.loken.entity.Users;
import com.loken.repository.IUsersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final IUsersRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Users user = userRepo.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User Not Found!"));
		List<SimpleGrantedAuthority> authorities =
		        user.getRoles().stream()
		                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
		                .toList();
		return new User(
					user.getEmail(),
					user.getPassword(),
					true,
				    true,
				    true,
				    true,
				    authorities
					);
	}

}
