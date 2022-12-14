package com.travelight.backend;

import com.google.ortools.constraintsolver.Assignment;
import com.google.ortools.constraintsolver.FirstSolutionStrategy;
import com.google.ortools.constraintsolver.IntVar;
import com.google.ortools.constraintsolver.RoutingDimension;
import com.google.ortools.constraintsolver.RoutingIndexManager;
import com.google.ortools.constraintsolver.RoutingModel;
import com.google.ortools.constraintsolver.RoutingSearchParameters;
import com.google.ortools.constraintsolver.main;

public class VrptwSolver {
  public VrptwSolver() {
    System.load("/usr/share/or-tools/libjniortools.so");
  }

  public void solve(VrptwDataModel vrptwDataModel) {
    // Create Routing Index Manager
    RoutingIndexManager manager =
        new RoutingIndexManager(
            vrptwDataModel.timeMatrix.data.length,
            vrptwDataModel.vehicleNumber,
            vrptwDataModel.depot);

    // Create Routing Model.
    RoutingModel routing = new RoutingModel(manager);

    // Create and register a transit callback.
    final int transitCallbackIndex =
        routing.registerTransitCallback(
            (long fromIndex, long toIndex) -> {
              // Convert from routing variable Index to user NodeIndex.
              int fromNode = manager.indexToNode(fromIndex);
              int toNode = manager.indexToNode(toIndex);
              return vrptwDataModel.timeMatrix.data[fromNode][toNode];
            });

    // Define cost of each arc.
    routing.setArcCostEvaluatorOfAllVehicles(transitCallbackIndex);

    // Add Time constraint.
    routing.addDimension(
        transitCallbackIndex, // transit callback
        TimeUtils.minutesPerDay, // allow waiting time
        TimeUtils.minutesPerDay, // vehicle maximum capacities
        false, // start cumul to zero
        "Time");
    RoutingDimension timeDimension = routing.getMutableDimension("Time");
    // Add time window constraints for each location except depot.
    for (int i = 1; i < vrptwDataModel.timeWindows.data.length; ++i) {
      long index = manager.nodeToIndex(i);
      timeDimension
          .cumulVar(index)
          .setRange(vrptwDataModel.timeWindows.data[i][0], vrptwDataModel.timeWindows.data[i][1]);
    }
    // Add time window constraints for each vehicle start node.
    int vehicle = 0;
    long index = routing.start(vehicle);
    timeDimension
        .cumulVar(index)
        .setRange(vrptwDataModel.timeWindows.data[0][0], vrptwDataModel.timeWindows.data[0][1]);

    // Instantiate route start and end times to produce feasible times.
    routing.addVariableMinimizedByFinalizer(timeDimension.cumulVar(routing.start(vehicle)));
    routing.addVariableMinimizedByFinalizer(timeDimension.cumulVar(routing.end(vehicle)));

    // Setting first solution heuristic.
    RoutingSearchParameters searchParameters =
        main.defaultRoutingSearchParameters().toBuilder()
            .setFirstSolutionStrategy(FirstSolutionStrategy.Value.PATH_CHEAPEST_ARC)
            .build();

    // Solve the problem.
    Assignment solution = routing.solveWithParameters(searchParameters);

    printSolution(vrptwDataModel, routing, manager, solution);
  }

  public void printSolution(
      VrptwDataModel vrptwDataModel,
      RoutingModel routing,
      RoutingIndexManager manager,
      Assignment solution) {
    // Inspect solution
    RoutingDimension timeDimension = routing.getMutableDimension("Time");
    int vehicleIndex = 0; // only one traveller
    long index = routing.start(vehicleIndex);
    String route = "";
    while (!routing.isEnd(index)) {
      IntVar timeVar = timeDimension.cumulVar(index);
      route +=
          manager.indexToNode(index)
              + " Time("
              + solution.min(timeVar)
              + ","
              + solution.max(timeVar)
              + ") -> ";
      index = solution.value(routing.nextVar(index));
    }
    IntVar timeVar = timeDimension.cumulVar(index);
    route +=
        manager.indexToNode(index)
            + " Time("
            + solution.min(timeVar)
            + ","
            + solution.max(timeVar)
            + ")";

    // Display the route
    System.out.println(route);

    // Total time required
    System.out.println("Total travel time: " + solution.objectiveValue());
  }
}
