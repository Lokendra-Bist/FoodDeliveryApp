package com.loken.entity;

import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Entity
@Data
public class Restaurant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Lob
	private byte[] coverPhoto;

	@Lob
	private byte[] restaurantPhoto;

	private String address;

	@Pattern(regexp = "^(\\+977)?9[678]\\d{8}$", message = "Invalid phone number")
	private String phoneNumber;

	private LocalTime openTime;

	private LocalTime closeTime;

	private LocalTime startTime;

	private LocalTime endTime;

	private String description;

	private Double latitude;

	private Double longitude;

}
