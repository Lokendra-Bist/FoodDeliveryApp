package com.loken.request;

import java.time.LocalTime;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RestaurantRequest {

    @NotBlank
    private String name;

    private String location;

    private LocalTime openTime;
    
    private LocalTime closeTime;
    
}