package com.travelight.backend;

import java.util.logging.Logger;

import com.google.ortools.Loader;
import com.google.ortools.constraintsolver.Assignment;
import com.google.ortools.constraintsolver.FirstSolutionStrategy;
import com.google.ortools.constraintsolver.IntVar;
import com.google.ortools.constraintsolver.RoutingDimension;
import com.google.ortools.constraintsolver.RoutingIndexManager;
import com.google.ortools.constraintsolver.RoutingModel;
import com.google.ortools.constraintsolver.RoutingSearchParameters;
import com.google.ortools.constraintsolver.main;

import com.travelight.backend.DistanceAPI;

public class RoutePlanner {
    
    // public static void main(String[] args) {
    //     String attr = DistanceAPI.apiKey;

    //     System.out.println(attr);
    // }
    public static TravelSchedule optimizeOrder(Attraction[] attractions, int departureDay) {
		// Get the distanceMatrix
        String[] placeIds = getPlaceIdsFromAttractions(attractions);
        final long[][] timeMatrix = DistanceAPI.getTimeMatrix(placeIds, attractions[0].getConstraint().getTransportation());
        System.out.println(timeMatrix[2][1]);

        // Parse the distanceMatrix & timeWindows into desirable format (DataModel) for OR-tools

        // Route optimization by OR-tools

        // make travelSchedule
        int[] order = {0, 2, 1};
		double[] arriveTimes = {1, 2, 3};
		double[] leaveTimes = {1.5, 2.5, 3.5};
		boolean isValid = true;
		TravelSchedule travelSchedule = new TravelSchedule(order, arriveTimes, leaveTimes, isValid);
        return travelSchedule;
    }

    public static TravelSchedule checkOrder(Attraction[] attractions, int departureDay) {
		int[] order = {0, 1, 2};
		double[] arriveTimes = {1, 2, 3};
		double[] leaveTimes = {1.5, 2.5, 3.5};
		boolean isValid = false;
		TravelSchedule travelSchedule = new TravelSchedule(order, arriveTimes, leaveTimes, isValid);
        return travelSchedule;
    }

    public static String[] getPlaceIdsFromAttractions(Attraction[] attractions) {
        String[] placeIds = new String[attractions.length];

        for (int i = 0; i < placeIds.length; i++) {
            String placeId = "place_id:" + attractions[i].placeId;
            placeIds[i] = placeId;
        }

        return placeIds;
    }
}