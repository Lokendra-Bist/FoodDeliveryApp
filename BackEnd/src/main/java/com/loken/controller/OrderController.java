package com.loken.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.loken.service.IOrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/order")
@CrossOrigin
@RequiredArgsConstructor
public class OrderController {
	
	private final IOrderService orderService;
	
	

}
