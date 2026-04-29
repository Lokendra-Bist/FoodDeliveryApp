package com.loken.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.loken.request.CategoryRequest;
import com.loken.response.CategoryResponse;
import com.loken.service.ICategoryMgmtService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {

	private final ICategoryMgmtService categoryService;

	@PreAuthorize("hasAnyRole('ADMIN', 'RESTAURANT_OWNER')")
	@PostMapping("saveCategory")
	public ResponseEntity<CategoryResponse> saveCategory(@Valid @ModelAttribute CategoryRequest request,
			@RequestParam("image") MultipartFile image) {
		return new ResponseEntity<>(categoryService.saveCategory(request, image), HttpStatus.OK);
	}

	@GetMapping("/getAllCategory")
	public ResponseEntity<List<CategoryResponse>> getAllCategory() {
		return new ResponseEntity<>(categoryService.getAllCategory(), HttpStatus.OK);
	}

	@GetMapping("/categoryByRestaurant/{restaurantId}")
	public ResponseEntity<List<CategoryResponse>> getCategoriesByRestaurant(
			@PathVariable("restaurantId") Long restaurantId) {
		return new ResponseEntity<>(categoryService.getCategoriesByRestaurant(restaurantId), HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteCategory/{id}")
	@Transactional
	public ResponseEntity<Void> deleteCategory(@PathVariable("id") Long id) {
		categoryService.deleteCategory(id);
		return ResponseEntity.noContent().build();
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/updateCategory/{id}")
	public ResponseEntity<CategoryResponse> updateCategory(@PathVariable("id") Long id,
			@ModelAttribute CategoryRequest request,
			@RequestParam(value = "image", required = false) MultipartFile image) {
		return ResponseEntity.ok(categoryService.updateCategory(id, request, image));
	}

	@GetMapping("/getCategories")
    public Page<CategoryResponse> getCategories(
            @RequestParam(name="page", defaultValue="0") int page,
            @RequestParam(name="size", defaultValue="5") int size,
            @RequestParam(name="search", defaultValue="") String search) {

        return categoryService.getCategories(page, size, search);
    }

}
