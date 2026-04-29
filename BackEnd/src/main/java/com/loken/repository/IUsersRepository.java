package com.loken.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.loken.entity.Users;
import java.util.List;
import java.util.Optional;


public interface IUsersRepository extends JpaRepository<Users, Long> {
	
	Optional<Users> findByEmail(String email);

	Optional<Users> findByPhoneNumber(String phoneNumber);
	
}
