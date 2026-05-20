package com.loken.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.loken.request.CheckOutRequest;
import com.loken.response.AdminOrderResponse;
import com.loken.response.OrderResponse;

public interface IOrderService {
	
	OrderResponse createPendingOrder(Long userId, CheckOutRequest request);
	
	Page<AdminOrderResponse> getAllOrders(
				int page,
				int size,
				String search,
				String orderStatus,
				String paymentStatus,
				String sortBy,
				String sortDir
			);
	
	List<OrderResponse> getOrderByUserId(Long userId);

}
