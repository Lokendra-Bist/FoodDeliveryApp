package com.loken.response;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RestaurantDashboardResponse {
	
	private Long totalOrders;
	
	private Long pendingOrders;
	
	private Long deliveredOrders;
	
	private Long totalMenuItems;
	
	private Double revenue;
	
	private List<RecentOrderResponse> recentOrders;
	
}
