package com.loken.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.loken.service.IMenuItemMgmtService;

import lombok.RequiredArgsConstructor;

//@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/admin/menu-items")
public class AdminMenuItemController {
	
	private final IMenuItemMgmtService menuItemService;
	
	@GetMapping("/")

}
