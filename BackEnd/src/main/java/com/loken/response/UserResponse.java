package com.loken.response;

import java.util.Set;

import com.loken.entity.Role;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {

    private Long id;

    private String userName;

    private String email;

    private String phoneNumber;

    private Set<Role> roles;

}