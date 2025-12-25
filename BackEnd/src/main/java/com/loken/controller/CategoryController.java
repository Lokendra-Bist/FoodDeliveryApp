package com.loken.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	@PostMapping("saveCategory")
	public ResponseEntity<CategoryResponse> saveCategory(@Valid @ModelAttribute CategoryRequest request,
																@RequestParam("photo") MultipartFile image) {
		return new ResponseEntity<>(categoryService.saveCategory(request, image), HttpStatus.OK);
	}
	
	@GetMapping("/getAllCategory")
	public ResponseEntity<List<CategoryResponse>> getAllCategory() {
		return new ResponseEntity<>(categoryService.getAllCategory(), HttpStatus.OK);
	}
	
	@GetMapping("/categoryByRestaurant/{restaurantId}")
    public ResponseEntity<List<CategoryResponse>> getCategoriesByRestaurant(
            @PathVariable("restaurantId") Long restaurantId
    ) {
        return new ResponseEntity<>(categoryService.getCategoriesByRestaurant(restaurantId), HttpStatus.OK);
    }

}
