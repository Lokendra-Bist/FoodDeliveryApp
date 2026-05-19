package com.loken.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.loken.entity.CustomUserDetails;
import com.loken.entity.Restaurant;
import com.loken.exception.PhotoProcessingException;
import com.loken.exception.ResourceNotFoundException;
import com.loken.mapper.RestaurantMapper;
import com.loken.repository.IRestaurantRepository;
import com.loken.request.RestaurantRequest;
import com.loken.response.RestaurantResponse;
import com.loken.security.AuthorizationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements IRestaurantMgmtService {

	private final IRestaurantRepository restaurantRepo;
	
	private final AuthorizationService authService;

	@PreAuthorize("hasRole('ADMIN')")
	@Override
	public RestaurantResponse addRestaurant(RestaurantRequest request, MultipartFile coverPhoto,
			MultipartFile restaurantPhoto) {
		byte[] coverPhotoBytes = null;
		byte[] restaurantPhotobytes = null;
		try {
			coverPhotoBytes = coverPhoto.getBytes();
			restaurantPhotobytes = restaurantPhoto.getBytes();
		} catch (IOException e) {
			throw new PhotoProcessingException("Cannot Read Photo Bytes");
		}
		Restaurant restaurant = RestaurantMapper.toEntity(request, coverPhotoBytes, restaurantPhotobytes);
		restaurantRepo.save(restaurant);
		return RestaurantMapper.toResponse(restaurant);
	}

	@Override
	public List<RestaurantResponse> getAllRestaurants() {
		return restaurantRepo.findAll().stream().map(RestaurantMapper::toResponse).collect(Collectors.toList());
	}

	@Override
	public RestaurantResponse getRestaurantById(Long id) {
		Restaurant restaurant = restaurantRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Restaurant Not Found With Id: " + id));
		return RestaurantMapper.toResponse(restaurant);
	}

	@Override
	public byte[] getImageById(Long id) {
		Restaurant restaurant = restaurantRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Restaurant Not FOund!"));
		if (restaurant.getRestaurantPhoto() == null) {
			throw new ResourceNotFoundException("Restaurant Image Not Found!");
		}
		return restaurant.getRestaurantPhoto();
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
	@Override
	public RestaurantResponse updateRestaurant(Long id, RestaurantRequest restaurantRequest,
			MultipartFile restaurantPhoto, MultipartFile coverPhoto, CustomUserDetails userDetails) {
		
		authService.checkRestaurantAccess(id, userDetails);
		
		Restaurant restaurant = restaurantRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));

		restaurant.setName(restaurantRequest.getName());
		restaurant.setAddress(restaurantRequest.getAddress());
		restaurant.setPhoneNumber(restaurantRequest.getPhoneNumber());
		restaurant.setDescription(restaurantRequest.getDescription());
		restaurant.setCloseTime(restaurantRequest.getCloseTime());
		restaurant.setOpenTime(restaurantRequest.getOpenTime());
		restaurant.setStartTime(restaurantRequest.getStartTime());
		restaurant.setEndTime(restaurantRequest.getEndTime());
		restaurant.setLatitude(restaurantRequest.getLatitude());
		restaurant.setLongitude(restaurantRequest.getLongitude());

		try {
			if (coverPhoto != null && !coverPhoto.isEmpty()) {
				restaurant.setCoverPhoto(coverPhoto.getBytes());
			}

			if (restaurantPhoto != null && !restaurantPhoto.isEmpty()) {
				restaurant.setRestaurantPhoto(restaurantPhoto.getBytes());
			}

		} catch (IOException e) {
			throw new PhotoProcessingException("Cannot read photo bytes");
		}

		restaurantRepo.save(restaurant);

		return RestaurantMapper.toResponse(restaurant);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@Override
	@Transactional
	public void deleteRestaurant(Long id) {
		Restaurant restaurant = restaurantRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Restaurant Not Found"));
		restaurantRepo.delete(restaurant);
	}

}
