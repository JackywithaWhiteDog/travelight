package com.travelight.backend;

import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.maps.GeoApiContext;
import com.google.maps.PlaceDetailsRequest;
import com.google.maps.errors.*;
import com.google.maps.model.OpeningHours;
import com.google.maps.model.PlaceDetails;
import com.travelight.backend.GoogleMapAPI;

public class DetailsAPI extends GoogleMapAPI {
    public static Attraction getDetailInfo(Attraction attraction) {
        String placeID = attraction.getPlaceId();
        placeID = "ChIJJ9z7h9OtQjQR8vwZA7PhkKs";
        PlaceDetailsRequest request = new PlaceDetailsRequest(context);
        PlaceDetails response = request.placeId(placeID).awaitIgnoreError();

        OpeningHours opens = response.openingHours;
        String formattedAddress = response.formattedAddress;
        // Testing
        if (opens == null) {
            System.out.println("No opening hours");
        } else {
            for (String dayInfo : opens.weekdayText)
                System.out.println(dayInfo);
        }
        
        attraction.setAddress(formattedAddress);
        attraction.setConstraint(new Constraint(null, null, 0, ""));

        return attraction;
    }
}
