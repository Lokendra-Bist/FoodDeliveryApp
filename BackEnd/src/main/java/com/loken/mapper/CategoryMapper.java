package com.loken.mapper;

import java.util.Base64;

import com.loken.entity.Category;
import com.loken.request.CategoryRequest;
import com.loken.response.CategoryResponse;

public class CategoryMapper {
	
	public static Category toEntity(CategoryRequest request, byte[] imageBytes) {
		Category category = new Category();
		category.setName(request.getName());
		category.setImage(imageBytes);
		return category;
	}
	
	public static CategoryResponse toResponse(Category category) {
		CategoryResponse response = new CategoryResponse();
		response.setId(category.getId());
		response.setName(category.getName());
		response.setImage(Base64.getEncoder().encodeToString(category.getImage()));
		return response;
	}

}
