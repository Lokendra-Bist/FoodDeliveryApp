package com.loken.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.loken.entity.RestaurantRating;
import com.loken.projection.TopRatedRestaurantProjection;

public interface IRestaurantRatingRepository extends JpaRepository<RestaurantRating, Long> {
	
	boolean existsByOrderId(Long orderId);
	
	Optional<RestaurantRating> findByOrderId(Long orderId);

	@Query("""
	        SELECT
	            r.id AS restaurantId,
	            r.name AS restaurantName,
	            r.restaurantPhoto AS restaurantPhoto,
	            COALESCE(AVG(rr.rating), 0) AS averageRating,
	            COUNT(rr.id) AS totalRatings
	        FROM Restaurant r
	        LEFT JOIN RestaurantRating rr
	            ON rr.restaurant.id = r.id
	        GROUP BY r.id, r.name, r.restaurantPhoto
	        ORDER BY COALESCE(AVG(rr.rating), 0) DESC,
	                 COUNT(rr.id) DESC
	    """)
	    Page<TopRatedRestaurantProjection> findTopRatedRestaurants(Pageable pageable);

}
