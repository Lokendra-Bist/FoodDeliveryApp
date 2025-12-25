package com.loken.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.loken.entity.Category;
import com.loken.entity.MenuItem;

public interface IMenuItemRepository extends JpaRepository<MenuItem, Long> {
	
	List<MenuItem> findByCategoryId(Long id);
	
	List<MenuItem> findByRestaurantIdAndCategoryId(Long restaurantId, Long categoryId);
	
	@Query("""
	        SELECT DISTINCT m.category
	        FROM MenuItem m
	        WHERE m.restaurant.id = :restaurantId
	    """)
	    List<Category> findDistinctCategoriesByRestaurant(
	            @Param("restaurantId") Long restaurantId
	    );
}
