package com.loken.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.loken.entity.CustomUserDetails;
import com.loken.entity.OrderStatus;
import com.loken.entity.Restaurant;
import com.loken.entity.RestaurantStatus;
import com.loken.entity.Role;
import com.loken.entity.Users;
import com.loken.exception.BadRequestException;
import com.loken.exception.PhotoProcessingException;
import com.loken.exception.ResourceNotFoundException;
import com.loken.mapper.RestaurantMapper;
import com.loken.repository.IMenuItemRepository;
import com.loken.repository.IOrderRepository;
import com.loken.repository.IRestaurantRepository;
import com.loken.repository.IUsersRepository;
import com.loken.request.RestaurantRequest;
import com.loken.response.RecentOrderResponse;
import com.loken.response.RestaurantDashboardResponse;
import com.loken.response.RestaurantResponse;
import com.loken.security.AuthorizationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements IRestaurantMgmtService {

	private final IRestaurantRepository restaurantRepo;
	
	private final IUsersRepository userRepo;
	
	private final AuthorizationService authService;
	
	private final IOrderRepository orderRepo;
	
	private final IMenuItemRepository menuItemRepo;

	@PreAuthorize("isAuthenticated()")
	@Override
	public RestaurantResponse addRestaurant(RestaurantRequest request, MultipartFile coverPhoto,
			MultipartFile restaurantPhoto, Long userId) {
		Users user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Couldn't Find User"));
				
		byte[] coverPhotoBytes = null;
		byte[] restaurantPhotobytes = null;
		try {
			coverPhotoBytes = coverPhoto.getBytes();
			restaurantPhotobytes = restaurantPhoto.getBytes();
		} catch (IOException e) {
			throw new PhotoProcessingException("Cannot Read Photo Bytes");
		}
		Restaurant restaurant = RestaurantMapper.toEntity(request, coverPhotoBytes, restaurantPhotobytes, user);
		restaurantRepo.save(restaurant);
		return RestaurantMapper.toResponse(restaurant);
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
	@Transactional
	@Override
	public List<RestaurantResponse> getAllRestaurantsByStatus() {
		return restaurantRepo.findByStatus(RestaurantStatus.APPROVED).stream().map(RestaurantMapper::toResponse).toList();
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
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

	@PreAuthorize("hasRole('ADMIN')")
	@Transactional
	@Override
	public List<RestaurantResponse> getPendingApplication() {
		return restaurantRepo.findByStatus(RestaurantStatus.PENDING).stream().map(RestaurantMapper::toResponse).collect(Collectors.toList());
	}

	@PreAuthorize("hasRole('ADMIN')")
	@Override
	public void updateStatus(Long id, RestaurantStatus status) {
		Restaurant restaurant = restaurantRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));
		
		if (restaurant.getStatus() != RestaurantStatus.PENDING) {
	        throw new BadRequestException("Application already processed");
	    }
		
		if(status == RestaurantStatus.APPROVED) {
			Users user = restaurant.getOwner();
			user.getRoles().add(Role.RESTAURANT_OWNER);
			userRepo.save(user);
		}
		
		restaurant.setStatus(status);
		restaurantRepo.save(restaurant);
	}

	@PreAuthorize("hasRole('RESTAURANT_OWNER')")
	@Transactional
	@Override
	public RestaurantResponse getRestaurantByOwnerId(Long ownerId) {
		Restaurant restaurant = restaurantRepo.findByOwnerId(ownerId)
									.orElseThrow(() -> new ResourceNotFoundException("Restaurant Not Found"));
		return RestaurantMapper.toResponse(restaurant);
	}

	@PreAuthorize("hasRole('RESTAURANT_OWNER')")
	@Transactional(readOnly = true)
	@Override
	public RestaurantDashboardResponse getDashboard(Long userId) {
		Restaurant restaurant = restaurantRepo.findByOwnerId(userId)
										.orElseThrow(() -> new ResourceNotFoundException("Restaurant Not Found"));
		
		Long totalOrders = orderRepo.countByRestaurantId(restaurant.getId());
		
		Long pendingOrders = orderRepo.countByRestaurantIdAndOrderStatus(restaurant.getId(), OrderStatus.CONFIRMED);
		
		Long deliveredOrders = orderRepo.countByRestaurantIdAndOrderStatus(restaurant.getId(), OrderStatus.DELIVERED);
		
		Long totalMenuItems = menuItemRepo.countByRestaurantId(restaurant.getId());
		
		Double revenue = orderRepo.getTotalRevenueByRestaurant(restaurant.getId());
		
		List<RecentOrderResponse> recentOrders = orderRepo.findTop5ByRestaurantIdOrderByCreatedAtDesc(restaurant.getId())
																	.stream()
																	.map(order -> RecentOrderResponse.builder()
																						.orderId(order.getId())
																						.customerName(order.getDeliveryDetails().getFullName())
																						.restaurantName(order.getRestaurant().getName())
																						.totalAmount(order.getTotalAmount())
																						.orderStatus(order.getOrderStatus().name())
																						.paymentStatus(order.getPaymentStatus().name())
																						.createdAt(order.getCreatedAt())
																						.build()
																			)
																	.toList();
		
		return RestaurantDashboardResponse.builder()
					.totalOrders(totalOrders)
					.deliveredOrders(deliveredOrders)
					.pendingOrders(pendingOrders)
					.totalMenuItems(totalMenuItems)
					.revenue(revenue != null ? revenue : 0.0)
					.recentOrders(recentOrders)
					.build();
	}

}
