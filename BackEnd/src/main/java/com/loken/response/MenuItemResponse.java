package com.loken.response;

import com.loken.entity.FoodType;

import lombok.Data;

@Data
public class MenuItemResponse {
	
	private Long id;

    private String name;

    private String description;

    private Double price;

    private Double discountPrice;

    private String image;

    private Long restaurantId;
    private String restaurantName;
    private String location;
    
    private Long categoryId;
    private String categoryName;
    
    private FoodType foodType;
    
}
