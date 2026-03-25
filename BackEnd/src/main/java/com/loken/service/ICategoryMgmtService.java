package com.loken.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.loken.request.CategoryRequest;
import com.loken.response.CategoryResponse;

public interface ICategoryMgmtService {
	
	CategoryResponse saveCategory(CategoryRequest request, MultipartFile photo);
	
	List<CategoryResponse> getAllCategory();
	
	List<CategoryResponse> getCategoriesByRestaurant(Long restaurantId);
	
	void deleteCategory(Long id);
	
	CategoryResponse updateCategory(Long id, CategoryRequest request, MultipartFile image);
	
	Page<CategoryResponse> getCategories(int page, int size, String search);
	
}
