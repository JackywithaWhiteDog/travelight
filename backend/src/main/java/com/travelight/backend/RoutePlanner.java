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
    
    public static void main(String[] args) {
        String attr = DistanceAPI.apiKey;

        System.out.println(attr);
    }
}