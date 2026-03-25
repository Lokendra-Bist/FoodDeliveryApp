package com.loken.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.loken.request.MenuItemRequest;
import com.loken.response.MenuItemResponse;
import com.loken.service.IMenuItemMgmtService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequestMapping("/api/menuItem")
@RequiredArgsConstructor
public class MenuItemController {

	private final IMenuItemMgmtService menuItemService;

	@PostMapping("/addMenuItem")
	public ResponseEntity<MenuItemResponse> addMenuItem(@Valid @ModelAttribute MenuItemRequest item,
			@RequestParam("image") MultipartFile image) {
		return new ResponseEntity<>(menuItemService.addMenuItem(item, image), HttpStatus.OK);
	}

	@GetMapping("/getAllItemsByCategory/{id}")
	public ResponseEntity<List<MenuItemResponse>> getAllMenuItemsByCategory(@PathVariable Long id) {
		return new ResponseEntity<>(menuItemService.getItemByCategory(id), HttpStatus.OK);
	}

	@GetMapping("/restaurant/{restaurantId}/category/{categoryId}")
	public ResponseEntity<List<MenuItemResponse>> getItemByRestaurantAndCategory(
			@PathVariable("restaurantId") Long restaurantId, @PathVariable("categoryId") Long categoryId) {
		return new ResponseEntity<>(menuItemService.getMenuItemByRestaurantAndCategory(restaurantId, categoryId),
				HttpStatus.OK);
	}

	@GetMapping("/getAllMenuItems")

	public ResponseEntity<List<MenuItemResponse>> getAllMenuItems() {
		return new ResponseEntity<>(menuItemService.getAllMenuItems(), HttpStatus.OK);
	}

	@GetMapping("/{id}/image")
	public ResponseEntity<byte[]> getMenuItemImage(@PathVariable("id") Long id) {
		byte[] image = menuItemService.getImageById(id);

		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
	}

	@GetMapping("/restaurant/{restaurantId}")
	public ResponseEntity<List<MenuItemResponse>> getMenuItemByRestaurantId(
			@PathVariable("restaurantId") Long restaurantId) {

		return ResponseEntity.ok(menuItemService.getMenuItemByRestaurantId(restaurantId));
	}

	@DeleteMapping("/delete/{menuId}")
	public ResponseEntity<Void> removeMenuItem(@PathVariable("menuId") Long menuId) {
		menuItemService.deleteMenuItem(menuId);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateMenuItem(@PathVariable("id") Long id,
			@ModelAttribute MenuItemRequest menuItemRequest,
			@RequestParam(value = "image", required = false) MultipartFile image) {
		return ResponseEntity.ok(menuItemService.updateMenuItem(id, menuItemRequest, image));
	}

	@GetMapping("/getMenuItems")
	public Page<MenuItemResponse> getMenuItems(@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "size", defaultValue = "6") int size,
			@RequestParam(name = "search", defaultValue = "") String search) {
		return menuItemService.getMenuItems(page, size, search);
	}
	
	@GetMapping("/getMenuItem")
    public Page<MenuItemResponse> getMenuItems(
            @RequestParam(name = "page") int page,
            @RequestParam(name = "size") int size,
            @RequestParam(name = "search" ,required = false) String search,
            @RequestParam(name = "foodType", required = false) String foodType,
            @RequestParam(name = "sortBy", defaultValue = "name") String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "asc") String sortDir
    ) {
        return menuItemService.getMenuItem(page, size, search, foodType, sortBy, sortDir);
    }
	
}
