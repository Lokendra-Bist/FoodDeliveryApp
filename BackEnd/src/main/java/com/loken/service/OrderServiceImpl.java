package com.loken.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.loken.entity.Cart;
import com.loken.entity.DeliveryDetails;
import com.loken.entity.OrderItem;
import com.loken.entity.OrderStatus;
import com.loken.entity.Orders;
import com.loken.entity.PaymentStatus;
import com.loken.entity.Users;
import com.loken.exception.BadRequestException;
import com.loken.exception.ResourceNotFoundException;
import com.loken.mapper.OrderMapper;
import com.loken.repository.ICartRepository;
import com.loken.repository.IOrderRepository;
import com.loken.repository.IUsersRepository;
import com.loken.request.CheckOutRequest;
import com.loken.response.OrderResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService {

	private final IOrderRepository orderRepo;

	private final ICartRepository cartRepo;

	private final IUsersRepository userRepo;

	@PreAuthorize("isAuthenticated()")
	@Transactional
	@Override
	public OrderResponse createPendingOrder(Long userId, CheckOutRequest request) {
		Users user = userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found!"));

		List<Cart> cartItems = cartRepo.findByUserId(userId);
		if(cartItems.isEmpty()) {
			throw new BadRequestException("Cart is empty");
		}
		
		DeliveryDetails details = DeliveryDetails.builder()
							.fullName(request.getFullName())
							.location(request.getLocation())
							.phoneNumber(request.getPhoneNumber())
							.build();
		
		Orders order = new Orders();
		order.setUser(user);
		order.setRestaurant(cartItems.get(0).getMenuItem().getRestaurant());
		order.setCreatedAt(LocalDateTime.now());
		order.setOrderStatus(OrderStatus.PENDING);
		order.setPaymentStatus(PaymentStatus.PENDING);
		order.setDeliveryDetails(details);
		
		List<OrderItem> orderItems = new ArrayList<>();
		double total = 0;
		for(Cart cart : cartItems) {
			double price = cart.getMenuItem().getDiscountPrice() > 0
							? cart.getMenuItem().getPrice()
							- cart.getMenuItem().getDiscountPrice()
							: cart.getMenuItem().getPrice();
			
			OrderItem orderItem = OrderItem.builder()
						.menuItem(cart.getMenuItem())
						.menuItemName(cart.getMenuItem().getName())
						.price(price)
						.quantity(cart.getQuantity())
						.imageUrl("/api/menuItem/" + cart.getMenuItem().getId() + "/image")
						.order(order)
						.build();
			orderItems.add(orderItem);
			total += price * cart.getQuantity();
		}
		order.setItems(orderItems);
		order.setTotalAmount(total);
		
		Orders savedOrder = orderRepo.save(order);
		return OrderMapper.toResponse(savedOrder);
	}

}
