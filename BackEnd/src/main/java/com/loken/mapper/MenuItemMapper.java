package com.loken.mapper;

import java.util.Base64;

import com.loken.entity.Category;
import com.loken.entity.MenuItem;
import com.loken.entity.Restaurant;
import com.loken.request.MenuItemRequest;
import com.loken.response.MenuItemResponse;

public class MenuItemMapper {
	
	public static MenuItem toEntity(MenuItemRequest request, Restaurant restaurant, Category category, byte[] imageBytes) {
	    MenuItem item = new MenuItem();
	    item.setName(request.getName());
	    item.setDescription(request.getDescription());
	    item.setPrice(request.getPrice());
	    item.setDiscountPrice(request.getDiscountPrice());
	    item.setImage(imageBytes);
	    item.setRestaurant(restaurant);
	    item.setCategory(category);
	    item.setFoodType(request.getFoodType());
	    return item;
	}
	
	public static MenuItemResponse toResponse(MenuItem item) {
        MenuItemResponse res = new MenuItemResponse();
        res.setId(item.getId());
        res.setName(item.getName());
        res.setDescription(item.getDescription());
        res.setPrice(item.getPrice());
        res.setDiscountPrice(item.getDiscountPrice());
        res.setImage(Base64.getEncoder().encodeToString(item.getImage()));

        if (item.getRestaurant() != null) {
        	res.setRestaurantId(item.getRestaurant().getId());
            res.setRestaurantName(item.getRestaurant().getName());
            res.setLocation(item.getRestaurant().getAddress());
        }
        if(item.getCategory() != null) {
        	res.setCategoryId(item.getCategory().getId());
        	res.setCategoryName(item.getCategory().getName());       
        }
        return res;
    }

}
