	package com.loken.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.loken.request.RestaurantRequest;
import com.loken.response.RestaurantResponse;
import com.loken.service.IRestaurantMgmtService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/restaurant")
public class RestaurantController {
	
	private final IRestaurantMgmtService restaurantService;
	
	@PostMapping("/registerRestaurant")
	public ResponseEntity<RestaurantResponse> addRestaurant(
	        @RequestPart("restaurant") RestaurantRequest request,
	        @RequestPart("coverPhoto") MultipartFile coverPhoto,
	        @RequestPart("restaurantPhoto") MultipartFile restaurantPhoto) {

	    return new ResponseEntity<>(
	            restaurantService.addRestaurant(request, coverPhoto, restaurantPhoto),
	            HttpStatus.OK
	    );
	}
	
	@GetMapping("/getAllRestaurant")
	public ResponseEntity<List<RestaurantResponse>> getAllRestaurants() {
		return new ResponseEntity<>(restaurantService.getAllRestaurants(), HttpStatus.OK);
	}
	
	@GetMapping("/getRestaurantById/{id}")
	public ResponseEntity<RestaurantResponse> getRestaurantById(@PathVariable("id") Long id) {
		return new ResponseEntity<>(restaurantService.getRestaurantById(id), HttpStatus.OK);
	}

}
