package com.loken.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminOrderResponse {

    private Long orderId;

    private String customerName;

    private String restaurantName;
    
    private String phoneNumber;
    
    private String location;
    
    private int quantity;

    private List<String> items;
    
    private Double totalAmount;

    private String paymentStatus;

    private String orderStatus;

    private LocalDateTime createdAt;

}