package com.loken.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.loken.entity.CustomUserDetails;
import com.loken.entity.RestaurantStatus;
import com.loken.request.RestaurantRequest;
import com.loken.response.RestaurantDashboardResponse;
import com.loken.response.RestaurantResponse;

public interface IRestaurantMgmtService {
	
	RestaurantResponse addRestaurant(RestaurantRequest request, MultipartFile coverPhoto, MultipartFile restaurantPhoto, Long userId);

	List<RestaurantResponse> getAllRestaurantsByStatus();
	
	RestaurantResponse getRestaurantById(Long id);
	
	byte[] getImageById(Long id);
	
	RestaurantResponse updateRestaurant(Long id, RestaurantRequest restaurantRequest, MultipartFile restaurantPhoto, MultipartFile coverPhoto, CustomUserDetails userDetails);
	
	void deleteRestaurant(Long id);
	
	List<RestaurantResponse> getPendingApplication();
	
	void updateStatus(Long id, RestaurantStatus status);
	
	RestaurantResponse getRestaurantByOwnerId(Long ownerId);
	
	RestaurantDashboardResponse getDashboard(Long userId);
		
}
