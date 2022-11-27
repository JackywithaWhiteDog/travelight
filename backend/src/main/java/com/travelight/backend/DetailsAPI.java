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
    public static String getDetailInfo(String placeID) {
        PlaceDetailsRequest request = new PlaceDetailsRequest(context);
        PlaceDetails response = request.placeId(placeID).awaitIgnoreError();

        OpeningHours opens = response.openingHours;
        System.out.println(opens);

        // Gson gson = new GsonBuilder().setPrettyPrinting().create();
        // String respond = gson.toJson(response);
        // System.out.println(respond);

        return "";
    }
}
