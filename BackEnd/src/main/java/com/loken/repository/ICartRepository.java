package com.loken.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.loken.entity.Cart;

public interface ICartRepository extends JpaRepository<Cart, Long> {
	
	List<Cart> findByUserId(Long userId);
	
	Cart findByUserIdAndMenuItemId(Long userId, Long menuItemId);
	
	void deleteByUserId(Long userId);

}
