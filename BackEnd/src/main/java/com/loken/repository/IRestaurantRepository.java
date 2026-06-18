package com.loken.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.loken.entity.Restaurant;
import com.loken.entity.RestaurantStatus;

public interface IRestaurantRepository extends JpaRepository<Restaurant, Long> {

	List<Restaurant> findByStatus(RestaurantStatus status);

	long count();
	
	Optional<Restaurant> findByOwnerId(Long userId);
		
}
