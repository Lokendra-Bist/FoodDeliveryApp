package com.loken.response;

import java.time.LocalTime;

import lombok.Data;

@Data
public class RestaurantResponse {

    private Long id;
    
    private String name;

    private String photo;
    
    private String location;
    
    private LocalTime openTime;
    
    private LocalTime closeTime;

    private Boolean isOpen;
    
}
