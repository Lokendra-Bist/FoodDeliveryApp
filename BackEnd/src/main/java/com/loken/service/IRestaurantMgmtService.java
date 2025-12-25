package com.loken.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.loken.request.RestaurantRequest;
import com.loken.response.RestaurantResponse;

public interface IRestaurantMgmtService {
	
	RestaurantResponse addRestaurant(RestaurantRequest request, MultipartFile coverPhoto, MultipartFile restaurantPhoto);

	List<RestaurantResponse> getAllRestaurants();
	
	RestaurantResponse getRestaurantById(Long id);
	
}
