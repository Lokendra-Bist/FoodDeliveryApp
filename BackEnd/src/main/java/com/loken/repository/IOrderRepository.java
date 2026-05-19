package com.loken.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.loken.entity.Orders;

public interface IOrderRepository extends JpaRepository<Orders, Long> {
	
	List<Orders> findByUserId(Long userId);
	
	Optional<Orders> findByTransactionUuid(String transactionUuid);
	
	List<Orders> findTop5ByOrderByCreatedAtDesc();
	
	@Query("""
			SELECT COALESCE(SUM(o.totalAmount), 0)
			FROM Orders o
			WHERE o.paymentStatus='PAID'
			""")
	Double getTotalRevenue();

}
