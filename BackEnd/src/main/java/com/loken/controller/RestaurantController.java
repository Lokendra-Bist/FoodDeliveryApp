package com.loken.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/registerRestaurant")
	public ResponseEntity<RestaurantResponse> addRestaurant(@RequestPart("restaurant") RestaurantRequest request,
			@RequestPart("coverPhoto") MultipartFile coverPhoto,
			@RequestPart("restaurantPhoto") MultipartFile restaurantPhoto) {

		return new ResponseEntity<>(restaurantService.addRestaurant(request, coverPhoto, restaurantPhoto),
				HttpStatus.OK);
	}

	@GetMapping("/getAllRestaurant")
	public ResponseEntity<List<RestaurantResponse>> getAllRestaurants() {
		return new ResponseEntity<>(restaurantService.getAllRestaurants(), HttpStatus.OK);
	}

	@GetMapping("/getRestaurantById/{id}")
	public ResponseEntity<RestaurantResponse> getRestaurantById(@PathVariable("id") Long id) {
		return new ResponseEntity<>(restaurantService.getRestaurantById(id), HttpStatus.OK);
	}

	@GetMapping("/{id}/image")
	public ResponseEntity<byte[]> getRestaurantImageById(@PathVariable("id") Long id) {
		byte[] image = restaurantService.getImageById(id);

		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
	@PutMapping("/update/{id}")
	public ResponseEntity<RestaurantResponse> updateRestaurant(@PathVariable("id") Long id,
			@RequestPart("restaurant") RestaurantRequest restaurantRequest,
			@RequestPart(name = "restaurantPhoto", required = false) MultipartFile restaurantPhoto,
			@RequestPart(name = "coverPhoto", required = false) MultipartFile coverPhoto) {
		return ResponseEntity
				.ok(restaurantService.updateRestaurant(id, restaurantRequest, restaurantPhoto, coverPhoto));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteRestaurant/{id}")
	public ResponseEntity<Void> deleteRestaurant(@PathVariable("id") Long id) {
		restaurantService.deleteRestaurant(id);
		return ResponseEntity.noContent().build();
	}

}
