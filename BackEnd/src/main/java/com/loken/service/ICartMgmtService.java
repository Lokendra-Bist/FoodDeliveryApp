package com.loken.service;

import com.loken.request.CartRequest;
import com.loken.response.CartItemResponse;

public interface ICartMgmtService {
	
	CartItemResponse saveCart(CartRequest request, String email);
	
	CartItemResponse getCart(String email);
	
	void removeCart(Long userId, Long menuItemId);
	
	void clearCart(Long userId);
	
}
