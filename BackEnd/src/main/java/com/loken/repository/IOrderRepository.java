package com.loken.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.loken.entity.OrderStatus;
import com.loken.entity.Orders;
import com.loken.entity.PaymentStatus;

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
	
	Page<Orders> findByUser_UserNameContainingIgnoreCaseAndOrderStatusAndPaymentStatus(
												String search,
												OrderStatus orderStatus,
												PaymentStatus paymentStatus,
												Pageable pageable);
	
	Page<Orders> findByUser_UserNameContainingIgnoreCase(String search, Pageable pageable);
	
	Page<Orders> findByUser_UserNameContainingIgnoreCaseAndOrderStatus(
	        String search,
	        OrderStatus orderStatus,
	        Pageable pageable
	);

	Page<Orders> findByUser_UserNameContainingIgnoreCaseAndPaymentStatus(
	        String search,
	        PaymentStatus paymentStatus,
	        Pageable pageable
	);
	
	Page<Orders> findByRestaurantEmailAndOrderStatus(String email, OrderStatus status, Pageable pageable);
	
	Long countByRestaurantId(Long restaurantId);
	
	Long countByRestaurantIdAndOrderStatus(Long restaurantId, OrderStatus status);
	
	List<Orders> findTop5ByRestaurantIdOrderByCreatedAtDesc(Long restaurantId);
	
	@Query("""
			SELECT COALESCE(SUM(o.totalAmount), 0)
			FROM Orders o
			WHERE o.restaurant.id = :restaurantId
			AND o.paymentStatus = 'PAID'And o.orderStatus = 'DELIVERED'
			""")
	Double getTotalRevenueByRestaurant(@Param("restaurantId") Long restaurantId);
	
}
