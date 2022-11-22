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
        {0, 6, 9, 8, 7, 3, 6, 2, 3, 2, 6, 6, 4, 4, 5, 9, 7},
        {6, 0, 8, 3, 2, 6, 8, 4, 8, 8, 13, 7, 5, 8, 12, 10, 14},
        {9, 8, 0, 11, 10, 6, 3, 9, 5, 8, 4, 15, 14, 13, 9, 18, 9},
        {8, 3, 11, 0, 1, 7, 10, 6, 10, 10, 14, 6, 7, 9, 14, 6, 16},
        {7, 2, 10, 1, 0, 6, 9, 4, 8, 9, 13, 4, 6, 8, 12, 8, 14},
        {3, 6, 6, 7, 6, 0, 2, 3, 2, 2, 7, 9, 7, 7, 6, 12, 8},
        {6, 8, 3, 10, 9, 2, 0, 6, 2, 5, 4, 12, 10, 10, 6, 15, 5},
        {2, 4, 9, 6, 4, 3, 6, 0, 4, 4, 8, 5, 4, 3, 7, 8, 10},
        {3, 8, 5, 10, 8, 2, 2, 4, 0, 3, 4, 9, 8, 7, 3, 13, 6},
        {2, 8, 8, 10, 9, 2, 5, 4, 3, 0, 4, 6, 5, 4, 3, 9, 5},
        {6, 13, 4, 14, 13, 7, 4, 8, 4, 4, 0, 10, 9, 8, 4, 13, 4},
        {6, 7, 15, 6, 4, 9, 12, 5, 9, 6, 10, 0, 1, 3, 7, 3, 10},
        {4, 5, 14, 7, 6, 7, 10, 4, 8, 5, 9, 1, 0, 2, 6, 4, 8},
        {4, 8, 13, 9, 8, 7, 10, 3, 7, 4, 8, 3, 2, 0, 4, 5, 6},
        {5, 12, 9, 14, 12, 6, 6, 7, 3, 3, 4, 7, 6, 4, 0, 9, 2},
        {9, 10, 18, 6, 8, 12, 15, 8, 13, 9, 13, 3, 4, 5, 9, 0, 9},
        {7, 14, 9, 16, 14, 8, 5, 10, 6, 5, 4, 10, 8, 6, 2, 9, 0},
    };
    public final long[][] timeWindows = {
        {0, 5}, // depot
        {7, 12}, // 1
        {10, 15}, // 2
        {16, 18}, // 3
        {10, 13}, // 4
        {0, 5}, // 5
        {5, 10}, // 6
        {0, 4}, // 7
        {5, 10}, // 8
        {0, 3}, // 9
        {10, 16}, // 10
        {10, 15}, // 11
        {0, 5}, // 12
        {5, 10}, // 13
        {7, 8}, // 14
        {10, 15}, // 15
        {11, 15}, // 16
    };
    public final int vehicleNumber = 4;
    public final int depot = 0;
  }

  /// @brief Print the solution.
  static void printSolution(
      DataModel data, RoutingModel routing, RoutingIndexManager manager, Assignment solution) {
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
        30, // allow waiting time
        30, // vehicle maximum capacities
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