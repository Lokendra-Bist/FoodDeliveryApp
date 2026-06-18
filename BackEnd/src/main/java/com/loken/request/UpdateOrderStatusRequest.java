package com.loken.request;

import com.loken.entity.OrderStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateOrderStatusRequest {
	
	private OrderStatus status;

}
