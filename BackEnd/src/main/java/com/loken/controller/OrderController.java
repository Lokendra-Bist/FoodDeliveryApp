package com.loken.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.loken.entity.CustomUserDetails;
import com.loken.entity.OrderStatus;
import com.loken.request.UpdateOrderStatusRequest;
import com.loken.response.AdminOrderResponse;
import com.loken.response.OrderResponse;
import com.loken.service.IOrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/order")
@CrossOrigin
@RequiredArgsConstructor
public class OrderController {
	
	private final IOrderService orderService;
	
	@GetMapping("/get-all-orders")
	public ResponseEntity<Page<AdminOrderResponse>> getAllOrders(
							@RequestParam(name = "page", defaultValue = "0") int page,
							@RequestParam(name = "size", defaultValue = "10") int size,
							@RequestParam(name = "search", required = false) String search,
							@RequestParam(name = "orderStatus", required = false) String orderStatus,
							@RequestParam(name = "paymentStatus", required = false) String paymentStatus,
							@RequestParam(name = "sortBy", defaultValue = "createdAt") String sortBy,
							@RequestParam(name = "sortDir", defaultValue = "desc") String sortDir
						) {
		return ResponseEntity.ok(orderService.getAllOrders(page, size, search, orderStatus, paymentStatus, sortBy, sortDir));
	}
	
	@GetMapping("/get-orders")
	public ResponseEntity<List<OrderResponse>> getOrderByUserId(Authentication auth) {
		CustomUserDetails details = (CustomUserDetails) auth.getPrincipal();
		Long userId = details.getId();
		return ResponseEntity.ok(orderService.getOrderByUserId(userId));
	}
	
	@GetMapping("/getOrderByRestaurant")
	public ResponseEntity<Page<OrderResponse>> getOrderByRestaurant(Authentication auth,
												@RequestParam("page") int page,
												@RequestParam("size") int size,
												@RequestParam(required = false, name = "status") OrderStatus status) {
		CustomUserDetails details = (CustomUserDetails) auth.getPrincipal();
		Long userId = details.getId();
		return ResponseEntity.ok(orderService.getOrderByRestaurantAndOrderStatus(userId, page, size, status));
	}
	
	@PutMapping("/updateStatus/{orderId}")
	public ResponseEntity<OrderResponse> updateOrderStatus(@PathVariable("orderId") Long orderId,
														@RequestBody UpdateOrderStatusRequest request) {
		return ResponseEntity.ok(orderService.updateOrderStatus(orderId, request.getStatus()));
	}
}
