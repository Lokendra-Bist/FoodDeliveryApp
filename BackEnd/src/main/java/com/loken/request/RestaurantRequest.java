package com.loken.request;

import java.time.LocalTime;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RestaurantRequest {

	@NotBlank(message = "Restaurant name is required")
	private String name;

	@NotBlank(message = "Description is required")
	@Column(length = 200)
	private String description;
	
	@NotBlank(message = "Address is required")
	private String address;
	
	@NotBlank(message = "PhoneNumber is required")
	private String phoneNumber;

	@DateTimeFormat(pattern = "HH:mm")
	@NotNull(message = "Open time is required")
	private LocalTime openTime;

	@DateTimeFormat(pattern = "HH:mm")
	@NotNull(message = "Close time is required")
	private LocalTime closeTime;

	@DateTimeFormat(pattern = "HH:mm")
	@NotNull(message = "Start time is required")
	private LocalTime startTime;

	@DateTimeFormat(pattern = "HH:mm")
	@NotNull(message = "End time is required")
	private LocalTime endTime;
    
    @NotNull(message = "Latitude is required")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    private Double longitude;

}