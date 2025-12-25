package com.loken.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.loken.entity.Restaurant;
import com.loken.exception.PhotoProcessingException;
import com.loken.exception.ResourceNotFoundException;
import com.loken.mapper.RestaurantMapper;
import com.loken.repository.IRestaurantRepository;
import com.loken.request.RestaurantRequest;
import com.loken.response.RestaurantResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements IRestaurantMgmtService {

	private final IRestaurantRepository restaurantRepo;
	
	@Override
	public RestaurantResponse addRestaurant(RestaurantRequest request, MultipartFile coverPhoto, MultipartFile restaurantPhoto) {
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
		return restaurantRepo.findAll()
							 .stream()
							 .map(RestaurantMapper::toResponse)
							 .collect(Collectors.toList());
	}

	@Override
	public RestaurantResponse getRestaurantById(Long id) {
	    Restaurant restaurant = restaurantRepo.findById(id)
	        .orElseThrow(() -> new ResourceNotFoundException("Restaurant Not Found With Id: " + id));
	    return RestaurantMapper.toResponse(restaurant);
	}

}
