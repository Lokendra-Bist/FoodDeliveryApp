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
	    item.setIsAvailable(request.getIsAvailable() != null ? request.getIsAvailable() : true);
	    item.setSpiceLevel(request.getSpiceLevel());
	    item.setRestaurant(restaurant);
	    item.setCategory(category);
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
        res.setIsAvailable(item.getIsAvailable());
        res.setSpiceLevel(item.getSpiceLevel());
        res.setRating(item.getRating());
        res.setCreatedAt(item.getCreatedAt());
        res.setUpdatedAt(item.getUpdatedAt());

        if (item.getRestaurant() != null) {
            res.setRestaurantId(item.getRestaurant().getId());
            res.setRestaurantName(item.getRestaurant().getName());
            res.setLocation(item.getRestaurant().getLocation());
            res.setOpenTime(item.getRestaurant().getOpenTime());
            res.setCloseTime(item.getRestaurant().getCloseTime());
            res.setImage(Base64.getEncoder().encodeToString(item.getRestaurant().getPhoto()));        
        }

        if (item.getCategory() != null) {
            res.setCategoryId(item.getCategory().getId());
            res.setCategoryName(item.getCategory().getName());
        }

        return res;
    }

}
