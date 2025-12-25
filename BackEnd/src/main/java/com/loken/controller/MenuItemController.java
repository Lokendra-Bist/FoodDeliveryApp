package com.loken.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	public ResponseEntity<List<MenuItemResponse>> getAllMenuItemsByCategory(
	        @PathVariable Long id) { 
	    return new ResponseEntity<>(menuItemService.getItemByCategory(id), HttpStatus.OK);
	}
	
	@GetMapping("/restaurant/{restaurantId}/category/{categoryId}")
	public ResponseEntity<List<MenuItemResponse>> getItemByRestaurantAndCategory(@PathVariable("restaurantId") Long restaurantId, 
																					@PathVariable("categoryId") Long categoryId) {
		return new ResponseEntity<>(menuItemService.getMenuItemByRestaurantAndCategory(restaurantId, categoryId), HttpStatus.OK);
	}

}
