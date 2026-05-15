package com.loken.response;

import java.time.LocalDateTime;
import java.util.List;

import com.loken.entity.DeliveryDetails;
import com.loken.entity.OrderStatus;
import com.loken.entity.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {
	
	private Long orderId;
	
	private Double totalAmount;
	
	private OrderStatus orderStatus;
	
	private PaymentStatus paymentStatus;
	
	private String paymentReferenceId;
	
	private DeliveryDetails deliveryDetails;
	
	private LocalDateTime createdAt;
	
	private List<OrderItemResponse> items;

}
