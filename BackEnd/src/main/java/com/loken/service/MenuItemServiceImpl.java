package com.loken.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.loken.entity.Category;
import com.loken.entity.MenuItem;
import com.loken.entity.Restaurant;
import com.loken.exception.InvalidDiscountPriceException;
import com.loken.exception.PhotoProcessingException;
import com.loken.exception.ResourceNotFoundException;
import com.loken.mapper.MenuItemMapper;
import com.loken.repository.ICategoryRepository;
import com.loken.repository.IMenuItemRepository;
import com.loken.repository.IRestaurantRepository;
import com.loken.request.MenuItemRequest;
import com.loken.response.MenuItemResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuItemServiceImpl implements IMenuItemMgmtService {
	
	private final IMenuItemRepository menuItemRepo;
	
	private final IRestaurantRepository restaurantRepo;
	
	private final ICategoryRepository categoryRepo;
	
	@Override
	@Transactional
	public MenuItemResponse addMenuItem(MenuItemRequest request, MultipartFile photo) {
		Restaurant restaurant = restaurantRepo.findById(request.getRestaurantId())
											.orElseThrow(() -> new ResourceNotFoundException("Restaurant not with the id: " + request.getRestaurantId()));
		
		Category category = categoryRepo.findById(request.getCategoryId())
										.orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));
		
		byte[] imageBytes = null;
		if(photo != null && !photo.isEmpty()) {
			try {
				imageBytes = photo.getBytes(); 
			} catch (IOException e) {
				throw new PhotoProcessingException("Failed to read image bytes");
			}
		}
		
		if(request.getDiscountPrice() != null && request.getDiscountPrice() > request.getPrice()) {
		    throw new InvalidDiscountPriceException("Discount price cannot be greater than price");
		}
		
		MenuItem menuItem = MenuItemMapper.toEntity(request, restaurant, category, imageBytes);
		MenuItem savedItem = menuItemRepo.save(menuItem);
		return MenuItemMapper.toResponse(savedItem);
	}

	@Override
	@Transactional
	public List<MenuItemResponse> getItemByCategory(Long id) {
		List<MenuItem> item= menuItemRepo.findByCategoryId(id);
		return item.stream().map(MenuItemMapper::toResponse).collect(Collectors.toList());
	}

}
