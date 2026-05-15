package com.loken.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.loken.entity.Orders;

public interface IOrderRepository extends JpaRepository<Orders, Long> {
	
	List<Orders> findByUserId(Long userId);
	
	Optional<Orders> findByTransactionUuid(String transactionUuid);

}
