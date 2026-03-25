package com.loken.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.loken.entity.Category;

public interface ICategoryRepository extends JpaRepository<Category, Long> {
	
	boolean existsByName(String name);
	
	Page<Category> findByNameContainingIgnoreCase(String name, Pageable pageable);
	
}
