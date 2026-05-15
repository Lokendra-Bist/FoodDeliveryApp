package com.loken.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.loken.entity.Cart;
import com.loken.entity.MenuItem;
import com.loken.response.CartItemResponse;
import com.loken.response.CartResponse;

public class CartMapper {
	
	public static CartResponse toCartResponse(Cart cart) {
        MenuItem item = cart.getMenuItem();

        double price = item.getDiscountPrice() > 0
                ? item.getPrice() - item.getDiscountPrice()
                : item.getPrice();

        return CartResponse.builder()
                .menuItemId(item.getId())
                .name(item.getName())
                .price(price)
                .quantity(cart.getQuantity())
                .imageUrl("/api/menuItem/" + item.getId() + "/image")
                .restaurantName(item.getRestaurant().getName())
                .build();
    }

    public static CartItemResponse toCartItemResponse(List<Cart> cartItems) {
        List<CartResponse> items = cartItems.stream()
                .map(CartMapper::toCartResponse)
                .collect(Collectors.toList());

        double total = items.stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();

        return CartItemResponse.builder()
                .items(items)
                .totalAmount(total)
                .build();
    }

}
