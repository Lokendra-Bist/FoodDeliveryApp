package com.loken.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RestaurantRatingResponse {

    private Long id;

    private Integer rating;

    private String comment;

    private String restaurantName;
    
    private boolean rated;
    
    private Long orderId;

}