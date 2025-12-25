package com.loken.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.loken.entity.Category;
import com.loken.exception.PhotoProcessingException;
import com.loken.exception.ResourceAlreadyExistsException;
import com.loken.mapper.CategoryMapper;
import com.loken.repository.ICategoryRepository;
import com.loken.repository.IMenuItemRepository;
import com.loken.request.CategoryRequest;
import com.loken.response.CategoryResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryMgmtService implements ICategoryMgmtService {

	private final ICategoryRepository categoryRepo;
	
	private final IMenuItemRepository menuReppo;
		
	@Override
	public CategoryResponse saveCategory(CategoryRequest request, MultipartFile photo) {
		if(categoryRepo.existsByName(request.getName())) {
		    throw new ResourceAlreadyExistsException("Category with this name already exists");
		}
		
		byte[] photoBytes = null;
		if(photo != null && !photo.isEmpty()) {
			try {
				photoBytes = photo.getBytes();
			} catch (IOException e) {
				throw new PhotoProcessingException("Cannot read the photo bytes");
			}
		}
		Category category = CategoryMapper.toEntity(request, photoBytes);
		Category savedCategory = categoryRepo.save(category);
		return CategoryMapper.toResponse(savedCategory);
	}

	@Override
	public List<CategoryResponse> getAllCategory() {
		List<Category> categoryList = categoryRepo.findAll();
		return categoryList.stream().map(CategoryMapper::toResponse).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public List<CategoryResponse> getCategoriesByRestaurant(Long restaurantId) {
		return menuReppo.findDistinctCategoriesByRestaurant(restaurantId).stream()
														.map(CategoryMapper::toResponse)
														.collect(Collectors.toList());
	}

}
