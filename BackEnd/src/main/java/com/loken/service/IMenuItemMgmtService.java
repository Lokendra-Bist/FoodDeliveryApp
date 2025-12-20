package com.loken.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.loken.request.MenuItemRequest;
import com.loken.response.MenuItemResponse;

public interface IMenuItemMgmtService {
	
	MenuItemResponse addMenuItem(MenuItemRequest request, MultipartFile photo);
	
	List<MenuItemResponse> getItemByCategory(Long id);

}
