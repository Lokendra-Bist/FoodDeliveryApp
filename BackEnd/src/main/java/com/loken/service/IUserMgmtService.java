package com.loken.service;

import java.util.List;

import com.loken.response.UserResponse;

public interface IUserMgmtService {
	
	List<UserResponse> getAllUsers();
	
	void deleteUser(Long userId);
	
	UserResponse getUserByUserId(Long id);

}
