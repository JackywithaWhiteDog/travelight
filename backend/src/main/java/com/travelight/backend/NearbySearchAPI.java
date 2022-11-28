package com.travelight.backend;

import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.maps.ImageResult;
import com.google.maps.NearbySearchRequest;
import com.google.maps.PhotoRequest;
import com.google.maps.model.Geometry;
import com.google.maps.model.LatLng;
import com.google.maps.model.OpeningHours;
import com.google.maps.model.Photo;
import com.google.maps.model.PlaceDetails;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;

@RestController
public class NearbySearchAPI extends GoogleMapAPI {

    @GetMapping("/nearbyAttractions")
    public List<Attraction> getNearbyAttractions(@RequestParam String latitude, @RequestParam String longitude,
            @RequestParam(defaultValue = "1.0") String minRating,
            @RequestParam(defaultValue = "1") String minComments) {
        // Return a list of attraction nearby position {latitude, longitude} with
        // constraints {minRating, minComments}

        NearbySearchRequest request = new NearbySearchRequest(context);

        PlacesSearchResponse response = request
                .location(new LatLng(Double.parseDouble(latitude), Double.parseDouble(longitude))).radius(1500)
                .awaitIgnoreError();

        List<Attraction> attractions = parseResult(response.results);

        return attractions;
    }

    List<Attraction> parseResult(PlacesSearchResult results[]) {
        List<Attraction> attractions = new ArrayList<>();
        // Gson gson = new GsonBuilder().setPrettyPrinting().create();
        // String respond = gson.toJson(results);
        // System.out.println(String.format("# of Results: %d", results.length));
        // System.out.println(respond);

        for (PlacesSearchResult result : results) {

            Geometry geo = result.geometry;

            Photo photo = result.photos[0];
            // PhotoRequest request = new
            // PhotoRequest(context).photoReference(photoReference);
            // ImageResult img = request.awaitIgnoreError();

            Attraction attraction = new Attraction(result.placeId, result.formattedAddress, result.rating,
            new GeoLocation(geo.location), null, photo.photoReference, result.name);
            
            attractions.add(attraction);
            
            // TODO part
            attraction = DetailsAPI.getDetailInfo(attraction);
        }

        return attractions;
    }
}