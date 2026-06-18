package com.loken.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TopRatedRestaurantResponse {
	
	private Long restaurantId;
	
	private String restaurantName;
	
	private String image;
	
	private Double averageRating;

	private Long totalRatings;

}
