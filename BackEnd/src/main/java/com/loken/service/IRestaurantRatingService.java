package com.loken.service;

import java.util.List;

import com.loken.request.RestaurantRatingRequest;
import com.loken.response.RestaurantRatingResponse;
import com.loken.response.TopRatedRestaurantResponse;

public interface IRestaurantRatingService {
	
	RestaurantRatingResponse addRating(Long userId, RestaurantRatingRequest request);
	
	List<TopRatedRestaurantResponse> getTopRatedRestaurants();

}
