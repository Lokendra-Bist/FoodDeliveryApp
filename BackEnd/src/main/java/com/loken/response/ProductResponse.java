package com.loken.response;

import lombok.Data;

@Data
public class ProductResponse {

    private Long id;
    
    private String name;
    
    private Double price;
    
    private Double discountPrice;

    private Boolean isVeg;
    
    private String spiceLevel;

    private String categoryName;
    
    private String restaurantName;

    private String imageUrl;
}