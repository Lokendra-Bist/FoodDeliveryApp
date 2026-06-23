package com.loken.service;

import com.loken.request.GoogleLoginRequest;
import com.loken.response.GoogleLoginResponse;

public interface IGoogleAuthService {
	
	GoogleLoginResponse googleLogin(GoogleLoginRequest request);

}
