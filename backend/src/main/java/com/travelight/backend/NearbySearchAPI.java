package com.travelight.backend;

import java.io.IOException;

import com.google.maps.GeoApiContext;
import com.google.maps.errors.*;

import com.travelight.backend.GoogleMapAPI;

public class NearbySearchAPI extends GoogleMapAPI {
    
    public static void main(String[] args) {
        String apiKey = GoogleMapAPI.apiKey;

        System.out.println(apiKey); // check that it can read the apiKey
    }
}