package com.loken.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.loken.request.CategoryRequest;
import com.loken.response.CategoryResponse;

public interface ICategoryMgmtService {
	
	CategoryResponse saveCategory(CategoryRequest request, MultipartFile photo);
	
	List<CategoryResponse> getAllCategory();

}
