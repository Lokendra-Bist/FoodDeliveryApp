package com.loken.service;

import java.util.Base64;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.loken.entity.OrderStatus;
import com.loken.entity.Orders;
import com.loken.entity.RestaurantRating;
import com.loken.entity.Users;
import com.loken.exception.BadRequestException;
import com.loken.exception.ResourceNotFoundException;
import com.loken.repository.IOrderRepository;
import com.loken.repository.IRestaurantRatingRepository;
import com.loken.repository.IUsersRepository;
import com.loken.request.RestaurantRatingRequest;
import com.loken.response.RestaurantRatingResponse;
import com.loken.response.TopRatedRestaurantResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RestaurantRatingServiceImpl implements IRestaurantRatingService {

	private final IRestaurantRatingRepository ratingRepo;
	
	private final IOrderRepository orderRepo;
	
	private final IUsersRepository userRepo;

	@Transactional
	@Override
	public RestaurantRatingResponse addRating(Long userId, RestaurantRatingRequest request) {
		Orders order = orderRepo.findById(request.getOrderId())
									.orElseThrow(() -> new ResourceNotFoundException("Order Not Found!"));
		
		if(!order.getUser().getId().equals(userId)) {
			throw new BadRequestException("Unauthorized");
		}
		
		if(order.getOrderStatus() != OrderStatus.DELIVERED) {
			throw new BadRequestException("You can only rate delivered orders");
		}
		
		if(ratingRepo.existsByOrderId(order.getId())) {
		    throw new BadRequestException("You have already rated this order");
		}
		
		Users user = userRepo.findById(userId)
										.orElseThrow(() -> new ResourceNotFoundException("User not found!"));
		
		RestaurantRating rating = RestaurantRating.builder()
											.rating(request.getRating())
											.comment(request.getComment())
											.restaurant(order.getRestaurant())
											.user(user)
											.order(order)
											.build();
		RestaurantRating savedRating = ratingRepo.save(rating);
		
		boolean rated = ratingRepo.existsByOrderId(order.getId());
		return RestaurantRatingResponse.builder()
								.id(savedRating.getId())
								.rating(savedRating.getRating())
								.comment(savedRating.getComment())
								.restaurantName(savedRating.getRestaurant().getName())
								.rated(rated)
								.orderId(order.getId())
								.build();
	}

	@Transactional
	@Override
	public List<TopRatedRestaurantResponse> getTopRatedRestaurants() {

	    Pageable pageable = PageRequest.of(0, 4);

	    return ratingRepo.findTopRatedRestaurants(pageable)
	            .getContent()
	            .stream()
	            .map(res -> TopRatedRestaurantResponse.builder()
	                    .restaurantId(res.getRestaurantId())
	                    .restaurantName(res.getRestaurantName())
	                    .image(
	                            res.getRestaurantPhoto() != null
	                                    ? Base64.getEncoder()
	                                            .encodeToString(
	                                                    res.getRestaurantPhoto())
	                                    : null
	                    )
	                    .averageRating(
	                            Math.round(
	                                    (res.getAverageRating() != null
	                                            ? res.getAverageRating()
	                                            : 0.0) * 10.0
	                            ) / 10.0
	                    )
	                    .totalRatings(res.getTotalRatings())
	                    .build())
	            .toList();
	}

}
