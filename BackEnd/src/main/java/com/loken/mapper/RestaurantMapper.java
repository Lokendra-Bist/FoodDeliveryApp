package com.loken.mapper;

import java.time.LocalTime;
import java.util.Base64;

import com.loken.entity.Restaurant;
import com.loken.request.RestaurantRequest;
import com.loken.response.RestaurantResponse;

public class RestaurantMapper {
	
	public static Restaurant toEntity(RestaurantRequest request, byte[] photoBytes) {
		Restaurant restaurant = new Restaurant();
		restaurant.setName(request.getName());
		restaurant.setPhoto(photoBytes);
		restaurant.setLocation(request.getLocation());
		restaurant.setOpenTime(request.getOpenTime());
		restaurant.setCloseTime(request.getCloseTime());
		return restaurant;
	}
	
	public static RestaurantResponse toResponse(Restaurant restaurant) {
		RestaurantResponse response = new RestaurantResponse();
		response.setId(restaurant.getId());
        response.setName(restaurant.getName());
        response.setLocation(restaurant.getLocation());
        response.setPhoto(Base64.getEncoder().encodeToString(restaurant.getPhoto()));
        response.setOpenTime(restaurant.getOpenTime());
        response.setCloseTime(restaurant.getCloseTime());
        response.setIsOpen(checkIfOpen(restaurant));
        return response;
	}

	private static Boolean checkIfOpen(Restaurant restaurant) {
		LocalTime now = LocalTime.now();
        return now.isAfter(restaurant.getOpenTime()) && now.isBefore(restaurant.getCloseTime());
	}

}
