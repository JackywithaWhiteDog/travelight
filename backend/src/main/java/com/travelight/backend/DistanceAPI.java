package com.travelight.backend;

import java.io.IOException;

import com.google.maps.DistanceMatrixApi;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.TravelMode;

import com.google.maps.errors.*;

public class DistanceAPI extends GoogleMapAPI {

    public static TimeMatrix getTimeMatrix(String[] placeIds, String transportation) {
        TimeMatrix timeMatrix = new TimeMatrix(true, new long[1][1]);
        try {
            TravelMode mode = parseTravelMode(transportation);
            DistanceMatrix distanceMatrix = DistanceMatrixApi.getDistanceMatrix(context, placeIds, placeIds).mode(mode).await();
            long[][] timeMatrixData = buildTimeMatrixDataFromDistanceMatrix(distanceMatrix);
            timeMatrix.setIsEmpty(false);
            timeMatrix.setData(timeMatrixData);
        } catch(IOException ioe) {
            System.out.print(ioe);
        } catch(ApiException ae) {
            System.out.print(ae);
        } catch(InterruptedException ie) {
            System.out.print(ie);
        }
        return timeMatrix;
    }

    public static long[][] buildTimeMatrixDataFromDistanceMatrix(DistanceMatrix distanceMatrix) {
        int l = distanceMatrix.rows.length;
        long[][] timeMatrixData = new long[l + 1][l + 1]; // + 1 for the dummy row and column

        for (int row = 1; row < timeMatrixData.length; row++) {
            for (int col = 1; col < timeMatrixData[0].length; col++) {
                long minutes;
                if (row == col) {
                    minutes = 0;
                } else {
                    long seconds = distanceMatrix.rows[row - 1].elements[col - 1].duration.inSeconds;
                    minutes = Math.round(seconds / TimeUtils.secondsPerMinute);
                }
                timeMatrixData[row][col] = minutes;
            }
        }

        return timeMatrixData;
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
