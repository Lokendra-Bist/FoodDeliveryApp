package com.loken.mapper;

import java.util.Base64;

import com.loken.entity.Restaurant;
import com.loken.entity.RestaurantStatus;
import com.loken.entity.Users;
import com.loken.request.RestaurantRequest;
import com.loken.response.RestaurantResponse;

public class RestaurantMapper {
	
	public static Restaurant toEntity(RestaurantRequest request, byte[] coverPhotoBytes, byte[] restaurantPhotoBytes, Users user) {
		Restaurant restaurant = new Restaurant();
		restaurant.setName(request.getName());
		restaurant.setDescription(request.getDescription());		
		restaurant.setAddress(request.getAddress());
		restaurant.setEmail(request.getEmail());
		restaurant.setPhoneNumber(request.getPhoneNumber());
		restaurant.setCoverPhoto(coverPhotoBytes);
		restaurant.setRestaurantPhoto(restaurantPhotoBytes);
		restaurant.setOpenTime(request.getOpenTime());
		restaurant.setCloseTime(request.getCloseTime());
		restaurant.setStartTime(request.getStartTime());
		restaurant.setEndTime(request.getEndTime());
		restaurant.setLatitude(request.getLatitude());
		restaurant.setLongitude(request.getLongitude());
		restaurant.setStatus(RestaurantStatus.PENDING);
		restaurant.setOwner(user);
		return restaurant;
	}
	
	public static RestaurantResponse toResponse(Restaurant restaurant) {
		RestaurantResponse response = new RestaurantResponse();
		response.setId(restaurant.getId());
        response.setName(restaurant.getName());
        response.setDescription(restaurant.getDescription());
        response.setAddress(restaurant.getAddress());
        response.setEmail(restaurant.getEmail());
        response.setPhoneNumber(restaurant.getPhoneNumber());
        response.setCoverPhoto(Base64.getEncoder().encodeToString(restaurant.getCoverPhoto()));
        response.setRestaurantPhoto(Base64.getEncoder().encodeToString(restaurant.getRestaurantPhoto()));
        response.setOpenTime(restaurant.getOpenTime());
        response.setCloseTime(restaurant.getCloseTime());
        response.setStartTime(restaurant.getStartTime());
        response.setEndTime(restaurant.getEndTime());
        response.setLatitude(restaurant.getLatitude());
        response.setLongitude(restaurant.getLongitude());
        response.setStatus(restaurant.getStatus().name());
        return response;
	}

}
