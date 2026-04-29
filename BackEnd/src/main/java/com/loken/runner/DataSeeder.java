package com.loken.runner;

import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.loken.entity.Role;
import com.loken.entity.Users;
import com.loken.repository.IUsersRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
	
	private final IUsersRepository userRepo;
	
	private final PasswordEncoder passwordEncoder;

	@Override
	public void run(String... args) throws Exception {
		if(userRepo.findByEmail("admin@system.com").isEmpty()) {
			Users admin = new Users();
			admin.setUserName("System Admin");
			admin.setEmail("admin@system.com");
			admin.setPhoneNumber("9812709257");
			admin.setPassword(passwordEncoder.encode("admin123"));
			admin.setRoles(Set.of(Role.ADMIN));
			userRepo.save(admin);
		}
	}

}
