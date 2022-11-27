package com.travelight.backend;

import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.maps.NearbySearchRequest;
import com.google.maps.model.Geometry;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;

@RestController
public class NearbySearchAPI extends GoogleMapAPI {

    @GetMapping("/nearbyAttractions")
    public List<Attraction> getNearbyAttractions(@RequestParam String latitude, @RequestParam String longitude) {
        // Return a list of attraction nearby position {latitude, longitude}
        NearbySearchRequest request = new NearbySearchRequest(context);
        PlacesSearchResponse response = request
                .location(new LatLng(Double.parseDouble(latitude), Double.parseDouble(longitude))).radius(1500).awaitIgnoreError();
        
        PlacesSearchResult results[] = response.results;
        List<Attraction> attractions = parseResult(results);
        
        // Gson gson = new GsonBuilder().setPrettyPrinting().create();
        // String respond = gson.toJson(results);
        // System.out.println(String.format("Lat: %s, Long: %s", latitude, longitude));
        // System.out.println(response);
        // System.out.println(String.format("# of Results: %d", results.length));
        // System.out.println(respond);

        return attractions;
    }

    List<Attraction> parseResult(PlacesSearchResult results[]) {
        List<Attraction> attractions = new ArrayList<>();
        for (PlacesSearchResult result : results) {
            Geometry geo = result.geometry;
            // Constraint constraint = new Constraint(null, null, 0, apiKey);
            String s = DetailsAPI.getDetailInfo(result.placeId);
            attractions.add(new Attraction(result.placeId, result.formattedAddress, result.rating, new GeoLocation(geo.location), null));
        }

        return attractions;
    }
}