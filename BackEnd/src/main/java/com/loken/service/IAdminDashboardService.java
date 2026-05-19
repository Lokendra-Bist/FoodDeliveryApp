package com.loken.service;

import java.util.List;

import com.loken.response.AdminDashboardResponse;
import com.loken.response.RecentOrderResponse;

public interface IAdminDashboardService {
	
	AdminDashboardResponse getDashboardStatus();
	
	List<RecentOrderResponse> getRecentOrders();

}
