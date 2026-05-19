package com.loken.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.loken.entity.Role;
import com.loken.repository.IMenuItemRepository;
import com.loken.repository.IOrderRepository;
import com.loken.repository.IRestaurantRepository;
import com.loken.repository.IUsersRepository;
import com.loken.response.AdminDashboardResponse;
import com.loken.response.RecentOrderResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminDashboardServiceImpl implements IAdminDashboardService{
	
	private final IUsersRepository usersRepo;
	
	private final IMenuItemRepository menuItemRepo;
	
	private final IRestaurantRepository restaurantRepository;
	
	private final IOrderRepository orderRepo;
	
	@Transactional(readOnly = true)
	@Override
	public AdminDashboardResponse getDashboardStatus() {
		return AdminDashboardResponse.builder()
								.totalUsers(usersRepo.countByRoles(Role.USER))
								.totalMenuItems(menuItemRepo.countDistinctByName())
								.totalOrders(orderRepo.count())
								.totalRestaurants(restaurantRepository.count())
								.totalRevenue(orderRepo.getTotalRevenue())
								.build();
	}

	@Transactional(readOnly = true)
	@Override
	public List<RecentOrderResponse> getRecentOrders() {
		return orderRepo.findTop5ByOrderByCreatedAtDesc()
						.stream()
						.map(order -> RecentOrderResponse.builder()
											.orderId(order.getId())
											.customerName(order.getDeliveryDetails().getFullName())
											.restaurantName(order.getRestaurant().getName())
											.totalAmount(order.getTotalAmount())
											.orderStatus(order.getOrderStatus().name())
											.build()
							)
						.toList();
						
	}

}
