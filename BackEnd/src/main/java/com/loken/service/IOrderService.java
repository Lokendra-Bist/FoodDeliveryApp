package com.loken.service;

import com.loken.request.CheckOutRequest;
import com.loken.response.OrderResponse;

public interface IOrderService {
	
	OrderResponse createPendingOrder(Long userId, CheckOutRequest request);

}
