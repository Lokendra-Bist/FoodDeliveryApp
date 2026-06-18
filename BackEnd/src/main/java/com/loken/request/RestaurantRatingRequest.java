package com.loken.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RestaurantRatingRequest {

    private Long orderId;

    private Integer rating;

    private String comment;

}