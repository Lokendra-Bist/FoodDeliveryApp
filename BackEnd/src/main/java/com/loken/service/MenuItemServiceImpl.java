package com.loken.service;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.loken.entity.Category;
import com.loken.entity.CustomUserDetails;
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
import com.loken.security.AuthorizationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuItemServiceImpl implements IMenuItemMgmtService {

	private final IMenuItemRepository menuItemRepo;

	private final IRestaurantRepository restaurantRepo;

	private final ICategoryRepository categoryRepo;
	
	private final AuthorizationService authService;

	@PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
	@Override
	@Transactional
	public MenuItemResponse addMenuItem(CustomUserDetails userDetails, MenuItemRequest request, MultipartFile photo) {
		authService.checkRestaurantAccess(request.getRestaurantId(), userDetails);
		
		Restaurant restaurant = restaurantRepo.findById(request.getRestaurantId()).orElseThrow(
				() -> new ResourceNotFoundException("Restaurant not with the id: " + request.getRestaurantId()));

		Category category = categoryRepo.findById(request.getCategoryId()).orElseThrow(
				() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

		byte[] imageBytes = null;
		if (photo != null && !photo.isEmpty()) {
			try {
				imageBytes = photo.getBytes();
			} catch (IOException e) {
				throw new PhotoProcessingException("Failed to read image bytes");
			}
		}

		if (request.getDiscountPrice() != null && request.getDiscountPrice() > request.getPrice()) {
			throw new InvalidDiscountPriceException("Discount price cannot be greater than price");
		}

		MenuItem menuItem = MenuItemMapper.toEntity(request, restaurant, category, imageBytes);
		MenuItem savedItem = menuItemRepo.save(menuItem);
		return MenuItemMapper.toResponse(savedItem);
	}

	@Override
	@Transactional
	public List<MenuItemResponse> getItemByCategory(Long id) {
		List<MenuItem> item = menuItemRepo.findByCategoryId(id);
		return item.stream().map(MenuItemMapper::toResponse).toList();
	}

	@Override
	@Transactional
	public List<MenuItemResponse> getMenuItemByRestaurantAndCategory(Long restaurantId, Long categoryId) {
		List<MenuItem> menuItemList = menuItemRepo.findByRestaurantIdAndCategoryId(restaurantId, categoryId);
		return menuItemList.stream().map(MenuItemMapper::toResponse).toList();
	}

	@Override
	@Transactional
	public List<MenuItemResponse> getAllMenuItems() {
		return menuItemRepo.findAll().stream().map(MenuItemMapper::toResponse).toList();
	}

	@Override
	public byte[] getImageById(Long id) {
		MenuItem item = menuItemRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("MenuItem not found"));

		if (item.getImage() == null) {
			throw new ResourceNotFoundException("Image not found");
		}

		return item.getImage();
	}

	@Override
	@Transactional
	public List<MenuItemResponse> getMenuItemByRestaurantId(Long id) {
		List<MenuItem> itemList = menuItemRepo.findByRestaurantId(id);
		if (itemList.isEmpty()) {
			throw new ResourceNotFoundException("No menu items found for this restaurant");
		}
		return itemList.stream().map(MenuItemMapper::toResponse).toList();
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
	@Override
	@Transactional
	public void deleteMenuItem(CustomUserDetails userDetails, Long menuId) {
		MenuItem item = menuItemRepo.findById(menuId)
				.orElseThrow(() -> new ResourceNotFoundException("Menu item not found"));
		
		authService.checkRestaurantAccess(item.getRestaurant().getId(), userDetails);
		
		menuItemRepo.delete(item);
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
	@Override
	@Transactional
	public MenuItemResponse updateMenuItem(Long menuId, MenuItemRequest request, MultipartFile imageFile) {
		MenuItem existing = menuItemRepo.findById(menuId)
				.orElseThrow(() -> new RuntimeException("Menu item not found"));

		Restaurant restaurant = restaurantRepo.findById(request.getRestaurantId())
				.orElseThrow(() -> new RuntimeException("Restaurant not found"));

		Category category = categoryRepo.findById(request.getCategoryId())
				.orElseThrow(() -> new RuntimeException("Category not found"));

		existing.setName(request.getName());
		existing.setDescription(request.getDescription());
		existing.setPrice(request.getPrice());
		existing.setDiscountPrice(request.getDiscountPrice());
		existing.setFoodType(request.getFoodType());
		existing.setRestaurant(restaurant);
		existing.setCategory(category);

		if (imageFile != null && !imageFile.isEmpty()) {
			try {
				existing.setImage(imageFile.getBytes());
			} catch (IOException e) {
				throw new RuntimeException("Failed to read image bytes", e);
			}
		}

		MenuItem saved = menuItemRepo.save(existing);

		return MenuItemMapper.toResponse(saved);
	}

	@Override
	@Transactional
	public Page<MenuItemResponse> getMenuItems(int page, int size, String search) {
		Pageable pageable = PageRequest.of(page, size);

		Page<MenuItem> menuItemPage = (search != null && !search.isEmpty())
				? menuItemRepo.findByNameContainingIgnoreCase(search, pageable)
				: menuItemRepo.findAll(pageable);

		return menuItemPage.map(MenuItemMapper::toResponse);
	}

	@Override
	@Transactional
	public Page<MenuItemResponse> getMenuItem(int page, int size, Integer categoryId, String search, String foodType, String sortBy,
			String sortDir) {

		Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();

		Pageable pageable = PageRequest.of(page, size, sort);

		Page<MenuItem> menuItemPage = menuItemRepo.searchAndFilter(search, foodType, categoryId, pageable);

		return menuItemPage.map(MenuItemMapper::toResponse);
	}

}
