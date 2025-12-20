package com.loken.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.loken.entity.Restaurant;

public interface IRestaurantRepository extends JpaRepository<Restaurant, Long> {

}
