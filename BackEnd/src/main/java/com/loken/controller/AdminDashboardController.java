package com.loken.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.loken.response.AdminDashboardResponse;
import com.loken.response.RecentOrderResponse;
import com.loken.service.IAdminDashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {
	
	private final IAdminDashboardService adminDashboardService;
	
	@GetMapping("/stats")
	public ResponseEntity<AdminDashboardResponse> getStats() {
		return ResponseEntity.ok(adminDashboardService.getDashboardStatus());
	}
	
	@GetMapping("/recent-orders")
	public ResponseEntity<List<RecentOrderResponse>> getRecentOrders() {
		return ResponseEntity.ok(adminDashboardService.getRecentOrders());
	}

}
