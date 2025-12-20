package com.loken.response;

import java.time.LocalDateTime;
import java.time.LocalTime;

import lombok.Data;

@Data
public class MenuItemResponse {
	
	private Long id;

    private String name;

    private String description;

    private Double price;

    private Double discountPrice;

    private String image;

    private Boolean isAvailable;

    private String spiceLevel;

    private Double rating;

    private Long restaurantId;
    private String restaurantName;
    private String location;
    private LocalTime openTime;
    private LocalTime closeTime;
    private String photo;

    private Long categoryId;
    private String categoryName;

    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;

}
