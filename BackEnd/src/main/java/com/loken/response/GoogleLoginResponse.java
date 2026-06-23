package com.loken.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoogleLoginResponse {
	
	private String token;

    private Long userId;

    private String fullName;

    private String email;

    private List<String> roles;

}
