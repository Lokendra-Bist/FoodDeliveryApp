package com.loken.security;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.loken.entity.CustomUserDetails;
import com.loken.entity.Restaurant;
import com.loken.exception.ResourceNotFoundException;
import com.loken.repository.IRestaurantRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthorizationService {

    private final IRestaurantRepository restaurantRepo;

    public void checkRestaurantAccess(Long restaurantId, CustomUserDetails user) {

        Restaurant restaurant =
                restaurantRepo.findById(restaurantId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Restaurant not found")
                );

        boolean isAdmin =
                user.getAuthorities()
                        .stream()
                        .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin &&
            !restaurant.getOwner().getId().equals(user.getId())) {

            throw new AccessDeniedException(
                    "You cannot manage another restaurant"
            );
        }
    }
}