package com.travelight.backend;

import com.google.ortools.Loader;
import com.google.ortools.constraintsolver.Assignment;
import com.google.ortools.constraintsolver.FirstSolutionStrategy;
import com.google.ortools.constraintsolver.IntVar;
import com.google.ortools.constraintsolver.RoutingDimension;
import com.google.ortools.constraintsolver.RoutingIndexManager;
import com.google.ortools.constraintsolver.RoutingModel;
import com.google.ortools.constraintsolver.RoutingSearchParameters;
import com.google.ortools.constraintsolver.main;
import java.util.logging.Logger;

/** VRPTW. */
public class VrpTimeWindows {
  private static final Logger logger = Logger.getLogger(VrpTimeWindows.class.getName());
  static class DataModel {
    public final long[][] timeMatrix = {
        {0, 0, 0, 0},
        {0, 0, 3, 4},
        {0, 5000, 0, 1},
        {0, 4, 1, 0},
        // {0, 0, 0, 0},
        // {0, 0, 19, 24},
        // {0, 19, 0, 23},
        // {0, 24, 23, 0}
    };
    public final long[][] timeWindows = {
        // {0, 1440},
        // {0, 10},
        // {4, 8},
        // {0, 12},
        {0, 1440},
        {900, 1440},
        {480, 1140},
        {480, 1140}
    };
    public final int vehicleNumber = 1;
    public final int depot = 0;
  }

  /// @brief Print the solution.
  static void printSolution(DataModel data, RoutingModel routing, RoutingIndexManager manager, Assignment solution) {
    // Solution cost.
    logger.info("Objective : " + solution.objectiveValue());
    // Inspect solution.
    RoutingDimension timeDimension = routing.getMutableDimension("Time");
    long totalTime = 0;
    for (int i = 0; i < data.vehicleNumber; ++i) {
      long index = routing.start(i);
      logger.info("Route for Vehicle " + i + ":");
      String route = "";
      while (!routing.isEnd(index)) {
        IntVar timeVar = timeDimension.cumulVar(index);
        route += manager.indexToNode(index) + " Time(" + solution.min(timeVar) + ","
            + solution.max(timeVar) + ") -> ";
        index = solution.value(routing.nextVar(index));
      }
      IntVar timeVar = timeDimension.cumulVar(index);
      route += manager.indexToNode(index) + " Time(" + solution.min(timeVar) + ","
          + solution.max(timeVar) + ")";
      logger.info(route);
      logger.info("Time of the route: " + solution.min(timeVar) + "min");
      totalTime += solution.min(timeVar);
    }
    logger.info("Total time of all routes: " + totalTime + "min");
  }

  public static void main(String[] args) throws Exception {
    Loader.loadNativeLibraries();
    // Instantiate the data problem.
    final DataModel data = new DataModel();

    // Create Routing Index Manager
    RoutingIndexManager manager =
        new RoutingIndexManager(data.timeMatrix.length, data.vehicleNumber, data.depot);

    // Create Routing Model.
    RoutingModel routing = new RoutingModel(manager);

    // Create and register a transit callback.
    final int transitCallbackIndex =
        routing.registerTransitCallback((long fromIndex, long toIndex) -> {
          // Convert from routing variable Index to user NodeIndex.
          int fromNode = manager.indexToNode(fromIndex);
          int toNode = manager.indexToNode(toIndex);
          return data.timeMatrix[fromNode][toNode];
        });

    // Define cost of each arc.
    routing.setArcCostEvaluatorOfAllVehicles(transitCallbackIndex);

    // Add Time constraint.
    routing.addDimension(transitCallbackIndex, // transit callback
        10000, // allow waiting time
        30000, // vehicle maximum capacities
        false, // start cumul to zero
        "Time");
    RoutingDimension timeDimension = routing.getMutableDimension("Time");
    // Add time window constraints for each location except depot.
    for (int i = 1; i < data.timeWindows.length; ++i) {
      long index = manager.nodeToIndex(i);
      timeDimension.cumulVar(index).setRange(data.timeWindows[i][0], data.timeWindows[i][1]);
    }
    // Add time window constraints for each vehicle start node.
    for (int i = 0; i < data.vehicleNumber; ++i) {
      long index = routing.start(i);
      timeDimension.cumulVar(index).setRange(data.timeWindows[0][0], data.timeWindows[0][1]);
    }

    // Instantiate route start and end times to produce feasible times.
    for (int i = 0; i < data.vehicleNumber; ++i) {
      routing.addVariableMinimizedByFinalizer(timeDimension.cumulVar(routing.start(i)));
      routing.addVariableMinimizedByFinalizer(timeDimension.cumulVar(routing.end(i)));
    }

    // Setting first solution heuristic.
    RoutingSearchParameters searchParameters =
        main.defaultRoutingSearchParameters()
            .toBuilder()
            .setFirstSolutionStrategy(FirstSolutionStrategy.Value.PATH_CHEAPEST_ARC)
            .build();

    // Solve the problem.
    Assignment solution = routing.solveWithParameters(searchParameters);

    // Print solution on console.
    printSolution(data, routing, manager, solution);
  }
}
// [END_program_part1]