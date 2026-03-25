package com.loken.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.loken.entity.Category;
import com.loken.exception.BadRequestException;
import com.loken.exception.PhotoProcessingException;
import com.loken.exception.ResourceAlreadyExistsException;
import com.loken.exception.ResourceNotFoundException;
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

	private final IMenuItemRepository menuItemRepo;

	@Override
	public CategoryResponse saveCategory(CategoryRequest request, MultipartFile photo) {
		if (categoryRepo.existsByName(request.getName())) {
			throw new ResourceAlreadyExistsException("Category with this name already exists");
		}

		byte[] photoBytes = null;
		if (photo != null && !photo.isEmpty()) {
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
		return menuItemRepo.findDistinctCategoriesByRestaurant(restaurantId).stream().map(CategoryMapper::toResponse)
				.collect(Collectors.toList());
	}

	@Override
	public void deleteCategory(Long id) {
		Category category = categoryRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category not found"));

		if (menuItemRepo.existsByCategoryId(id)) {
			throw new BadRequestException("Category is used by menu items and cannot be deleted.");
		}
		categoryRepo.deleteById(id);
	}

	@Override
	public CategoryResponse updateCategory(Long id, CategoryRequest request, MultipartFile image) {
		Category category = categoryRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot found the category"));
		
		if(image != null && !image.isEmpty()) {
			try {
				category.setImage(image.getBytes());
			} catch (IOException e) {
				throw new PhotoProcessingException("Cannot read the photo bytes");
			}
		}
		category.setName(request.getName());
		Category savedCategory = categoryRepo.save(category);
		return CategoryMapper.toResponse(savedCategory);
	}

	@Override
	@Transactional(readOnly = true)
	public Page<CategoryResponse> getCategories(int page, int size, String search) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Category> categoryPage = (search != null && !search.isBlank())
	            ? categoryRepo.findByNameContainingIgnoreCase(search, pageable)
	            : categoryRepo.findAll(pageable);

	    return categoryPage.map(CategoryMapper::toResponse);
	}

}
