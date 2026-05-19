package com.loken.service;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.loken.entity.Cart;
import com.loken.entity.MenuItem;
import com.loken.entity.Users;
import com.loken.exception.ResourceNotFoundException;
import com.loken.mapper.CartMapper;
import com.loken.repository.ICartRepository;
import com.loken.repository.IMenuItemRepository;
import com.loken.repository.IUsersRepository;
import com.loken.request.CartRequest;
import com.loken.response.CartItemResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartMgmtServiceImpl implements ICartMgmtService {

	private final ICartRepository cartRepo;

	private final IMenuItemRepository menuRepo;

	private final IUsersRepository userRepo;

	@PreAuthorize("isAuthenticated()")
	@Transactional
	@Override
	public CartItemResponse saveCart(CartRequest request, String email) {
		MenuItem item = menuRepo.findById(request.getMenuItemId())
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find menuItem"));

		Users user = userRepo.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User Not Found!"));

		int qty = request.getQuantity() > 0 ? request.getQuantity() : 1;

		List<Cart> existingCarts = cartRepo.findByUserId(user.getId());
		if (!existingCarts.isEmpty()) {
			Long existingRestaurantId = existingCarts.get(0).getMenuItem().getRestaurant().getId();

			if (!existingRestaurantId.equals(item.getRestaurant().getId())) {
				throw new RuntimeException("Only one restaurant allowed in the cart");
			}
		}
		Cart cart = cartRepo.findByUserIdAndMenuItemId(user.getId(), item.getId());
		if (cart != null) {
			cart.setQuantity(cart.getQuantity() + qty);
		} else {
			cart = new Cart();
			cart.setUser(user);
			cart.setMenuItem(item);
			cart.setQuantity(qty);
		}
		cartRepo.save(cart);
		List<Cart> updatedCart = cartRepo.findByUserId(user.getId());
		return CartMapper.toCartItemResponse(updatedCart);
	}

	@PreAuthorize("isAuthenticated()")
	@Transactional
	@Override
	public CartItemResponse getCart(String email) {
		Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found!"));

        List<Cart> cartItems = cartRepo.findByUserId(user.getId());

        return CartMapper.toCartItemResponse(cartItems);
	}

	@PreAuthorize("#p0 == authentication.principal.id")
	@Override
	public void removeCart(Long userId, Long menuItemId) {
		Cart cart = cartRepo.findByUserIdAndMenuItemId(userId, menuItemId);
		if(cart != null) {
			cartRepo.delete(cart);
		}
	}

	@PreAuthorize("#p0 == authentication.principal.id")
	@Transactional
	@Override
	public void clearCart(Long userId) {
		cartRepo.deleteByUserId(userId);
	}

}
