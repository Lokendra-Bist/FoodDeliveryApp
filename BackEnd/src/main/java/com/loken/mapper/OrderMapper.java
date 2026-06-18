package com.loken.mapper;

import java.util.List;

import com.loken.entity.OrderItem;
import com.loken.entity.Orders;
import com.loken.entity.PaymentStatus;
import com.loken.response.OrderItemResponse;
import com.loken.response.OrderResponse;

public class OrderMapper {
	
	public static OrderResponse toResponse(Orders order) {
		List<OrderItemResponse> items = order.getItems().stream()
														.map(OrderMapper::toItemResponse)
														.toList();
		
		return OrderResponse.builder()
					.orderId(order.getId())
					.totalAmount(order.getTotalAmount())
					.deliveryDetails(order.getDeliveryDetails())
					.restaurantName(order.getRestaurant().getName())
					.orderStatus(order.getOrderStatus())
					.paymentStatus(PaymentStatus.PENDING)
					.createdAt(order.getCreatedAt())
					.items(items)
					.build();
	}
	
	public static OrderItemResponse toItemResponse(OrderItem item) {
		return OrderItemResponse.builder()
					.menuItemId(item.getMenuItem().getId())
					.menuItemName(item.getMenuItemName())
					.price(item.getPrice())
					.quantity(item.getQuantity())
					.imageUrl(item.getImageUrl())
					.build();
	}
	
}
