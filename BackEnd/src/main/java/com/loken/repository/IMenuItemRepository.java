package com.loken.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	List<Category> findDistinctCategoriesByRestaurant(@Param("restaurantId") Long restaurantId);

	List<MenuItem> findByRestaurantId(Long id);

	Boolean existsByCategoryId(Long id);

	Page<MenuItem> findByNameContainingIgnoreCase(String name, Pageable pageable);

	@Query("""
			    SELECT m FROM MenuItem m
			    WHERE
			        (:search IS NULL OR LOWER(m.name) LIKE LOWER(CONCAT('%', :search, '%')))
			        AND (:foodType IS NULL OR :foodType = 'ALL' OR LOWER(m.foodType) = LOWER(:foodType))
			""")
	Page<MenuItem> searchAndFilter(@Param("search") String search, @Param("foodType") String foodType,
			Pageable pageable);
}
