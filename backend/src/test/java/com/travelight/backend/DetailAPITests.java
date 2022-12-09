package com.travelight.backend;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.DisplayName;
import org.springframework.boot.test.context.SpringBootTest;

import com.google.maps.model.Photo;
import com.google.maps.model.PlacesSearchResult;

@SpringBootTest
public class DetailAPITests {

    @Test
    @DisplayName("rating < minRating")
    void testRatingSmaller() {
        String types[] = {"library"};
        Photo photos[] = {new Photo()};
        Filter filter = new Filter(3, 0);
        PlacesSearchResult result = new PlacesSearchResult();
        result.types = types;
        result.rating = 1.0f; // Invalid value
        result.photos = photos;
        result.userRatingsTotal = 1000;
        assertEquals(false, filter.verify(result));
    }

    @Test
    @DisplayName("rating >= minRating")
    void testRatingLargerOrEqual() {
        String types[] = {"library"};
        Photo photos[] = {new Photo()};
        Filter filter = new Filter(3, 0);
        PlacesSearchResult result = new PlacesSearchResult();
        result.types = types;
        result.rating = 3.0f; // Valid value
        result.photos = photos;
        result.userRatingsTotal = 1000;
        assertEquals(true, filter.verify(result));
    }

    @Test
    @DisplayName("Invalid place type")
    void testInvalidPlaceType() {
        String types[] = {"Test_type"}; // Wrong type
        Photo photos[] = {new Photo()};
        Filter filter = new Filter(3, 0);
        PlacesSearchResult result = new PlacesSearchResult();
        result.types = types;
        result.rating = 3.0f;
        result.photos = photos;
        result.userRatingsTotal = 1000;
        assertEquals(false, filter.verify(result));
    }

    @Test
    @DisplayName("Null photo reference")
    void testNullPhotoReference() {
        String types[] = {"library"};
        Photo photos[] = null; // Invalid value
        Filter filter = new Filter(3, 0);
        PlacesSearchResult result = new PlacesSearchResult();
        result.types = types;
        result.rating = 3.0f;
        result.photos = photos;
        result.userRatingsTotal = 1000;
        assertEquals(false, filter.verify(result));
    }
}
