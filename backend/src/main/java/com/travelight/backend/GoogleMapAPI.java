package com.travelight.backend;

import com.google.maps.GeoApiContext;
import com.google.gson.Gson; 
import com.google.gson.GsonBuilder;

public class GoogleMapAPI {
    public static final String apiKey = "AIzaSyAHkedBbxV1S43lc4WtrLnHsr-i9wjeFKo";
	public static final GeoApiContext context = new GeoApiContext.Builder()
		.apiKey(apiKey)
		.build();
	public static final Gson gson = new GsonBuilder().setPrettyPrinting().create();    
}
