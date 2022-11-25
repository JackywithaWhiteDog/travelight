package com.travelight.backend;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.maps.GeoApiContext;
import com.google.maps.NearbySearchRequest;
import com.google.maps.errors.*;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;
import com.travelight.backend.GoogleMapAPI;

@RestController
public class NearbySearchAPI extends GoogleMapAPI {
    @GetMapping("/nearbyAttractions")
    public GeoLocation getNearbyAttractions(@RequestParam String latitude, @RequestParam String longitude) {
        System.out.println(apiKey); // check that it can read the apiKey
        NearbySearchRequest request = new NearbySearchRequest(context);
        PlacesSearchResponse response = request
                .location(new LatLng(Double.parseDouble(latitude), Double.parseDouble(longitude))).awaitIgnoreError();
        System.out.println(response);
        // PlacesSearchResult results[] = response.results;
        // System.out.println(results[0]);
        System.out.println(String.format("Lat: %s, Long: %s", latitude, longitude));
        // try {
        //     NearbySearchRequest request = new NearbySearchRequest(context);
        //     PlacesSearchResponse response = request
        //             .location(new LatLng(Double.parseDouble(latitude), Double.parseDouble(longitude))).awaitIgnoreError();
        //     System.out.println(String.format("Lat: %s, Long: %s", latitude, longitude));
        //     // GeocodingResult[] results = GeocodingApi.geocode(context, street).await();

        //     // Gson gson = new GsonBuilder().setPrettyPrinting().create();
        //     // respond = gson.toJson(results);
        //     // System.out.println(respond);
        //     // Invoke .shutdown() after your application is done making requests
        //     context.shutdown();
        // } catch (IOException ioe) {
        //     // System.out.println(ioe);
        // } catch (ApiException ae) {
        //     System.out.println("API error");
        // } catch (InterruptedException ie) {
        //     // System.out.println(ie);
        // }
        return new GeoLocation(Double.parseDouble(latitude), Double.parseDouble(longitude));
    }
}