package com.loken.response;

import java.time.LocalTime;

import lombok.Data;

@Data
public class RestaurantResponse {

	private Long id;

	private String name;

	private String coverPhoto;

	private String restaurantPhoto;

	private String address;
	
	private String phoneNumber;

	private String description;

	private LocalTime openTime;

	private LocalTime closeTime;

	private LocalTime startTime;

	private LocalTime endTime;
	
	private Double latitude;
	
    private Double longitude;

}
