package com.loken.response;

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
public class OrderItemResponse {
	
	private Long menuItemId;
	
	private String menuItemName;
	
	private Double price;
	
	private Integer quantity;
	
	private String imageUrl;

}
