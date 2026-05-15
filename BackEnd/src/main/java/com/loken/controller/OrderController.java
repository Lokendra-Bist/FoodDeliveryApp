//package com.loken.controller;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.loken.entity.CustomUserDetails;
//import com.loken.request.CheckOutRequest;
//import com.loken.response.OrderResponse;
//import com.loken.service.IOrderService;
//
//import lombok.RequiredArgsConstructor;
//
//@RestController
//@RequestMapping("/api/order")
//@CrossOrigin
//@RequiredArgsConstructor
//public class OrderController {
//	
//	private final IOrderService orderService;
//	
//	@PostMapping("/checkOut")
//	public ResponseEntity<OrderResponse> checkOut(Authentication auth, CheckOutRequest request) {
//		CustomUserDetails details = (CustomUserDetails) auth.getPrincipal();
//		Long userId = details.getId();
//		return ResponseEntity.ok(orderService.createPendingOrder(userId, request));
//	}
//
//}
