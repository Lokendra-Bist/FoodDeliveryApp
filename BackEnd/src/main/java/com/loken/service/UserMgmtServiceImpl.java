package com.loken.service;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.loken.entity.Role;
import com.loken.entity.Users;
import com.loken.mapper.UserMapper;
import com.loken.repository.IUsersRepository;
import com.loken.response.UserResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserMgmtServiceImpl implements IUserMgmtService {
	
	private final IUsersRepository usersRepo;

	@PreAuthorize("hasRole('ADMIN')")
	@Override
	public List<UserResponse> getAllUsers() {
		return usersRepo.findByRolesNot(Role.ADMIN)
					.stream()
					.map(UserMapper::toUsersResponse)
					.toList();
	}

	@Override
	public void deleteUser(Long userId) {
		usersRepo.deleteById(userId);
	}
	
	@Override
	public UserResponse getUserByUserId(Long id) {
		Users user = usersRepo.findById(id).get();
		return UserMapper.toUsersResponse(user);
	}

}
