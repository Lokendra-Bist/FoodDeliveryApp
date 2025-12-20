package com.loken.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.loken.entity.MenuItem;

public interface IMenuItemRepository extends JpaRepository<MenuItem, Long> {
	
	List<MenuItem> findByCategoryId(Long id);

}
