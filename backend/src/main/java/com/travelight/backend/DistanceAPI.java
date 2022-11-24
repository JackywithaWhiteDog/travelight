package com.travelight.backend;

import java.io.IOException;

import com.google.maps.DistanceMatrixApi;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.TravelMode;

import com.google.maps.errors.*;

public class DistanceAPI extends GoogleMapAPI {
    
    // public static void main(String[] args) {
    //     String apiKey = GoogleMapAPI.apiKey;

    //     System.out.println(apiKey);
    // }
    public static final double secondsPerMinute = 60.0;

    public static long[][] getTimeMatrix(String[] placeIds, String transportation) {
        try {
            TravelMode mode = parseTravelMode(transportation);
            DistanceMatrix matrix = DistanceMatrixApi.getDistanceMatrix(context, placeIds, placeIds).mode(mode).await();
            System.out.println(gson.toJson(matrix));
        } catch(IOException ioe) {

        } catch(ApiException ae) {

        } catch(InterruptedException ie) {
            
        }

        long[][] timeMatrix = {
            {0, 1, 2},
            {3, 4, 5},
            {6, 7, 8}
        };
        return timeMatrix;
    }

    public static long[][] buildTimeMatrixFromDistanceMatrix(DistanceMatrix distanceMatrix) {
        int l = distanceMatrix.rows.length;
        long[][] timeMatrix = new long[l][l];

        for (int row = 0; row < l; row++) {
            for (int col = 0; col < l; col++) {
                long minutes;
                if (row == col) {
                    minutes = 0;
                } else {
                    long seconds = distanceMatrix.rows[row].elements[col].duration.inSeconds;
                    minutes = Math.round(seconds / secondsPerMinute);
                }
                timeMatrix[row][col] = minutes;
            }
        }

        return timeMatrix;
    }

    public static TravelMode parseTravelMode(String transportation) {
        TravelMode mode;
        if (transportation.equals("driving")) {
            mode = TravelMode.DRIVING;
        } else if (transportation.equals("bicycling")) {
            mode = TravelMode.BICYCLING;
        } else if (transportation.equals("transit")) {
            mode = TravelMode.TRANSIT;
        } else if (transportation.equals("walking")) {
            mode = TravelMode.WALKING;
        } else {
            mode = TravelMode.UNKNOWN;
        }
        return mode;
    }
}
