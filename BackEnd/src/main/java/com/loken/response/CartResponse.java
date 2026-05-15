package com.loken.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponse {
	
	private Long menuItemId;
	
	private String name;
	
	private String imageUrl;
	
	private Double price;
	
	private int quantity;
	
	private String restaurantName;

}
