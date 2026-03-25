package com.loken.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.loken.request.MenuItemRequest;
import com.loken.response.MenuItemResponse;

public interface IMenuItemMgmtService {

	MenuItemResponse addMenuItem(MenuItemRequest request, MultipartFile photo);

	List<MenuItemResponse> getItemByCategory(Long id);

	List<MenuItemResponse> getMenuItemByRestaurantAndCategory(Long restaurantId, Long categoryId);

	List<MenuItemResponse> getAllMenuItems();

	byte[] getImageById(Long id);

	List<MenuItemResponse> getMenuItemByRestaurantId(Long id);

	void deleteMenuItem(Long menuId);

	MenuItemResponse updateMenuItem(Long menuId, MenuItemRequest request, MultipartFile imageFile);

	Page<MenuItemResponse> getMenuItems(int page, int size, String search);

	Page<MenuItemResponse> getMenuItem(
            int page,
            int size,
            String search,
            String foodType,
            String sortBy,
            String sortDir
    );

}
