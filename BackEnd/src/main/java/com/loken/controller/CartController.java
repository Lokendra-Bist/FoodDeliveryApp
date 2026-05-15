package com.loken.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.loken.entity.CustomUserDetails;
import com.loken.request.CartRequest;
import com.loken.response.CartItemResponse;
import com.loken.service.ICartMgmtService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
@RequiredArgsConstructor
public class CartController {

	private final ICartMgmtService cartService;

	@PostMapping("/addCart")
	public ResponseEntity<CartItemResponse> saveToCart(@RequestBody CartRequest request, Authentication auth) {
		String email = auth.getName();
		return ResponseEntity.ok(cartService.saveCart(request, email));
	}
	
	@GetMapping("/getCart")
	public ResponseEntity<CartItemResponse> getCarts(Authentication auth) {
		String email = auth.getName();
		return ResponseEntity.ok(cartService.getCart(email));
	}
	
	@DeleteMapping("/remove/{menuItemId}")
	public ResponseEntity<?> removeItem(@PathVariable("menuItemId") Long menuItemId, 
										Authentication auth) {
		CustomUserDetails details = (CustomUserDetails) auth.getPrincipal();
		Long userId = details.getId();
		cartService.removeCart(userId, menuItemId);
		return ResponseEntity.ok("Item Removed From Cart");
	}
	
	@DeleteMapping("/clear")
	public ResponseEntity<?> clearCart(Authentication auth) {
		CustomUserDetails details = (CustomUserDetails) auth.getPrincipal();
		cartService.clearCart(details.getId());
		return ResponseEntity.ok("Cart Cleared Successfully!");
	}
	
}
