package com.loken.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.loken.entity.CustomUserDetails;
import com.loken.request.CheckOutRequest;
import com.loken.response.EsewaPaymentResponse;
import com.loken.response.OrderResponse;
import com.loken.service.EsewaPaymentService;
import com.loken.service.IOrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment/esewa")
@CrossOrigin
public class EsewaPaymentController {
	
	private final IOrderService orderService;
	
	private final EsewaPaymentService esewaService;
	
	@PostMapping("/checkout")
	public ResponseEntity<EsewaPaymentResponse> checkOut(@RequestBody CheckOutRequest request,
												Authentication auth) {
		CustomUserDetails details = (CustomUserDetails) auth.getPrincipal();
		Long userId = details.getId();
		
		OrderResponse orderResponse = orderService.createPendingOrder(userId, request);
		
		return ResponseEntity.ok(esewaService.initiatePayment(orderResponse.getOrderId()));
	}
	
	@GetMapping("/verify")
	public ResponseEntity<String> verifyPayment(@RequestParam("data") String data) {
		return ResponseEntity.ok(esewaService.verifyPayment(data));
	}
	
}
