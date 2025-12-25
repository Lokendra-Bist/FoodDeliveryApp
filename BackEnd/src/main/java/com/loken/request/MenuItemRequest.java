package com.loken.request;

import com.loken.entity.FoodType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class MenuItemRequest {
	
	@NotBlank(message = "Menu item name is required")
    private String name;

    private String description;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be greater than 0")
    private Double price;

    @Positive(message = "Discount price must be greater than or equal to 0")
    private Double discountPrice = 0.0;
    
    @NotNull(message = "Restaurant ID is required")
    private Long restaurantId;

    @NotNull(message = "Category ID is required")
    private Long categoryId;
    
    @NotNull
    private FoodType foodType;
	
}
