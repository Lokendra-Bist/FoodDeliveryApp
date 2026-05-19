package com.loken.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecentOrderResponse {
	
	private Long orderId;
	
	private String customerName;
	
	private String restaurantName;
	
	private Double totalAmount;
	
	private String orderStatus;

}
