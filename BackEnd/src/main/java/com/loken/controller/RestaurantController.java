package com.loken.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.loken.request.RestaurantRequest;
import com.loken.response.RestaurantResponse;
import com.loken.service.IRestaurantMgmtService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/restaurant")
public class RestaurantController {
	
	private final IRestaurantMgmtService restaurantService;
	
	@PostMapping("registerRestaurant")
	public ResponseEntity<RestaurantResponse> addRestaurant(
									@ModelAttribute RestaurantRequest request,
									@RequestParam("photo") MultipartFile photoFile) {
		return new ResponseEntity<>(restaurantService.addRestaurant(request, photoFile), HttpStatus.OK);
	}
	
	@GetMapping("/getAllRestaurant")
	public ResponseEntity<List<RestaurantResponse>> getAllRestaurants() {
		return new ResponseEntity<>(restaurantService.getAllRestaurants(), HttpStatus.FOUND);
	}

}
