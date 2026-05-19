package com.loken.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.loken.response.UserResponse;
import com.loken.service.IUserMgmtService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/user")
@CrossOrigin
@RequiredArgsConstructor
public class UsersController {
	
	private final IUserMgmtService usersService;
	
	@GetMapping("get_all_users")
	public ResponseEntity<List<UserResponse>> getAllUsers() {
		return ResponseEntity.ok(usersService.getAllUsers());
	}
	
	@DeleteMapping("delete_user/{id}")
	public ResponseEntity<String> removeUser(@PathVariable("id") Long id) {
		usersService.deleteUser(id);
		return ResponseEntity.ok("User Deleted Successfully!");
	}

}
