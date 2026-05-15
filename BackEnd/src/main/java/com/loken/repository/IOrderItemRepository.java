package com.loken.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.loken.entity.OrderItem;

public interface IOrderItemRepository extends JpaRepository<OrderItem, Long> {

}
