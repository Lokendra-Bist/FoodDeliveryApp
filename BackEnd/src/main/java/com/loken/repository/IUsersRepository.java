package com.loken.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.loken.entity.Role;
import com.loken.entity.Users;


public interface IUsersRepository extends JpaRepository<Users, Long> {
	
	Optional<Users> findByEmail(String email);

	Optional<Users> findByPhoneNumber(String phoneNumber);
	
	List<Users> findByRolesNot(Role role);
	
	long countByRoles(Role role);
	
}
