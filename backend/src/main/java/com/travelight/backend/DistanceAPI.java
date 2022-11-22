package com.travelight.backend;

import java.io.IOException;

import com.google.maps.DistanceMatrixApi;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DistanceMatrix;

import com.google.maps.errors.*;

import com.travelight.backend.GoogleMapAPI;

public class DistanceAPI extends GoogleMapAPI {
    
    public static void main(String[] args) {
        String apiKey = GoogleMapAPI.apiKey;

        System.out.println(apiKey);
    }

    public static DistanceMatrix getDistanceMatrix(String[] origins, String[] destinations) {
        try {
            DistanceMatrix matrix = DistanceMatrixApi.getDistanceMatrix(GoogleMapAPI.context, origins, destinations).await();
        } catch(IOException ioe) {

        } catch(ApiException ae) {

        } catch(InterruptedException ie) {
            
        }

        DistanceMatrix matrix = new DistanceMatrix(origins, destinations, null);
        return matrix;
    }
}
