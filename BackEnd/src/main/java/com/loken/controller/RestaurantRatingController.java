package com.loken.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.loken.entity.CustomUserDetails;
import com.loken.request.RestaurantRatingRequest;
import com.loken.response.RestaurantRatingResponse;
import com.loken.response.TopRatedRestaurantResponse;
import com.loken.service.IRestaurantRatingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin
@RequiredArgsConstructor
public class RestaurantRatingController {
	
	private final IRestaurantRatingService ratingService;
	
	@PostMapping("/addRating")
	public ResponseEntity<RestaurantRatingResponse> addRating(Authentication auth,@RequestBody RestaurantRatingRequest request) {
		CustomUserDetails details = (CustomUserDetails)auth.getPrincipal();
		Long userId = details.getId();
		
		return ResponseEntity.ok(ratingService.addRating(userId, request));
	}
	
	@GetMapping("/top-rating")
	public ResponseEntity<List<TopRatedRestaurantResponse>> getTopRatedRestaurant() {
		return ResponseEntity.ok(ratingService.getTopRatedRestaurants());
	}

}
