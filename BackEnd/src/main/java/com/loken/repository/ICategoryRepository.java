package com.loken.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.loken.entity.Category;

public interface ICategoryRepository extends JpaRepository<Category, Long> {
	
	boolean existsByName(String name);
	
}
