package com.loken.projection;

public interface TopRatedRestaurantProjection {

    Long getRestaurantId();

    String getRestaurantName();

    byte[] getRestaurantPhoto();

    Double getAverageRating();

    Long getTotalRatings();
}