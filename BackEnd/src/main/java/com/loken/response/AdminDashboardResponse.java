package com.loken.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDashboardResponse {
	
	private Long totalUsers;
	
	private Long totalRestaurants;
	
	private Long totalOrders;
	
	private Long totalMenuItems;
	
	private Double totalRevenue;

}
