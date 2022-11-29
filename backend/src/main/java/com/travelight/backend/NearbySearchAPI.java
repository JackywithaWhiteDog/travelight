package com.travelight.backend;

import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.maps.NearbySearchRequest;
import com.google.maps.model.Geometry;
import com.google.maps.model.LatLng;
import com.google.maps.model.Photo;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;

@RestController
public class NearbySearchAPI extends GoogleMapAPI {

    @GetMapping("/nearbyAttractions")
    public List<Attraction> getNearbyAttractions(@RequestParam String latitude, @RequestParam String longitude,
            @RequestParam(defaultValue = "1.0") String minRating,
            @RequestParam(defaultValue = "1") String minComments) {
        NearbySearchRequest request = new NearbySearchRequest(context);

        PlacesSearchResponse response = request
                .location(new LatLng(Double.parseDouble(latitude), Double.parseDouble(longitude))).radius(1500)
                .awaitIgnoreError();

        List<Attraction> attractions = parseResult(response.results);

        return attractions;
    }

    List<Attraction> parseResult(PlacesSearchResult results[]) {
        List<Attraction> attractions = new ArrayList<>();

        for (PlacesSearchResult result : results) {
            // Generate detail information for each attraction.
            Geometry geo = result.geometry;

            Photo photo = result.photos[0];

            Attraction attraction = new Attraction(result.placeId, result.formattedAddress, result.rating,
                    new GeoLocation(geo.location), null, photo.photoReference, result.name);

            attraction = DetailsAPI.getDetailInfo(attraction);

            attractions.add(attraction);
        }

        return attractions;
    }
}