package com.travelight.backend;

import com.google.common.collect.Collections2;
import com.google.common.primitives.Ints;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class RoutePlanner {
  static final VrptwSolver vrptwSolver = new VrptwSolver();

  public static TravelSchedule planTravelSchedule(OptimizationInfo optimizationInfo) {
    Attraction[] attractions = optimizationInfo.getAttractions();
    int departureDay = optimizationInfo.getDepartureDay();
    String transportation = optimizationInfo.getTransportation();
    System.out.println(String.format("===== Travel by '%s' =====", transportation));

    // Extract information
    String[] placeIds = getPlaceIdsFromAttractions(attractions);
    TimeMatrix timeMatrix = DistanceAPI.getTimeMatrix(placeIds, transportation);
    TimeWindows timeWindows = getTimeWindowsFromAttractions(attractions, departureDay);
    long[] stayTimes = getStayTimesFromAttractions(attractions);

    timeMatrix.printMatrix();
    timeWindows.printWindows();
    printStayTimes(stayTimes);

    // Build the DataModel
    VrptwDataModel vrptwDataModel = new VrptwDataModel(timeMatrix, timeWindows, stayTimes);
    vrptwDataModel.transformDataByStayTimes();

    // System.out.println("After data transformation by stayTimes:");
    // vrptwDataModel.timeMatrix.printMatrix();
    // vrptwDataModel.timeWindows.printWindows();
    // printStayTimes(stayTimes);

    // Check that time window is valid
    if (!isValidTimeWindows(vrptwDataModel.timeWindows)) {
      return new TravelSchedule(null, null, null, null, null, 0, false);
    }

    // If time window is valid, perform route check or optimization
    TravelSchedule travelSchedule;
    boolean performCheck = optimizationInfo.getCheck();
    List<Integer> originalOrder =
        IntStream.rangeClosed(1, optimizationInfo.attractions.length)
            .boxed()
            .collect(Collectors.toList()); // original travel order
    if (performCheck) {
      travelSchedule = checkOrder(vrptwDataModel, originalOrder);
    } else {
      travelSchedule = optimizeOrderBruteForce(vrptwDataModel, originalOrder);
    }

    if (travelSchedule.order != null) {
      convertTravelScheduleOrder(travelSchedule);
    }
    return travelSchedule;
  }

  public static void convertTravelScheduleOrder(TravelSchedule travelSchedule) {
    for (int i = 0; i < travelSchedule.order.length; i++) {
      travelSchedule.order[i] -= 1;
    }
  }

  public static boolean isValidTimeWindows(TimeWindows timeWindows) {
    for (int row = 0; row < timeWindows.data.length; row++) {
      long open = timeWindows.data[row][0];
      long close = timeWindows.data[row][1];
      if ((close < open) || (open < 0) || (close < 0)) {
        return false;
      }
    }
    return true;
  }

  public static TravelSchedule optimizeOrderBruteForce(
      VrptwDataModel vrptwDataModel, List<Integer> originalOrder) {

    Collection<List<Integer>> perms = Collections2.permutations(originalOrder);
    // Traverse every possible permutation
    double minTransportationTime = -1.0;
    TravelSchedule bestTravelSchedule = new TravelSchedule(null, null, null, null, null, 0, false);
    for (List<Integer> perm : perms) {
      // System.out.println("\nCurrently testing: " + perm.toString());
      TravelSchedule travelSchedule = checkOrder(vrptwDataModel, perm);
      if (travelSchedule.isValid) {
        double curTransportationTime = sumTimes(travelSchedule.transportationTimes);
        if ((minTransportationTime == -1.0) || (curTransportationTime < minTransportationTime)) {
          minTransportationTime = curTransportationTime;
          bestTravelSchedule = travelSchedule;
        }
      }
    }

    // Check the originalOrder
    System.out.println("\nCurrently testing the original order: " + originalOrder.toString());
    TravelSchedule originalTravelSchedule = checkOrder(vrptwDataModel, originalOrder);
    if (originalTravelSchedule.isValid) {
      double originalTransportationTime = sumTimes(originalTravelSchedule.transportationTimes);
      double savedTime = originalTransportationTime - minTransportationTime;
      System.out.println(
          "\nThe original transporation time: "
              + originalTransportationTime * TimeUtils.minutesPerHour
              + " / "
              + "The best transportation time: "
              + minTransportationTime * TimeUtils.minutesPerHour
              + " / "
              + "Total saved time: "
              + savedTime * TimeUtils.minutesPerHour);
      bestTravelSchedule.setSavedTime(savedTime);
    }

    return bestTravelSchedule;
  }

  public static TravelSchedule optimizeOrder(VrptwDataModel vrptwDataModel) {
    // Route optimization by OR-tools
    // vrptwSolver.solve(vrptwDataModel);

    // convert the solution to the travelSchedule
    int[] order = {0, 2, 1};
    double[] arriveTimes = {1, 2, 3};
    double[] leaveTimes = {1.5, 2.5, 3.5};
    double[] transporationTimes = {1, 1};
    double[] idleTimes = {0, 0};
    double savedTime = 1;

    boolean isValid = true;
    TravelSchedule travelSchedule =
        new TravelSchedule(
            order, arriveTimes, leaveTimes, transporationTimes, idleTimes, savedTime, isValid);
    return travelSchedule;
  }

  public static TravelSchedule checkOrder(VrptwDataModel vrptwDataModel, List<Integer> order) {
    int numAttractions = order.size();

    double[] arriveTimes = new double[numAttractions];
    double[] leaveTimes = new double[numAttractions];
    double[] transportationTimes = new double[numAttractions - 1];
    double[] idleTimes = new double[numAttractions - 1];

    long curTime = vrptwDataModel.timeWindows.data[order.get(numAttractions - 1)][1];
    ; // initial time @ the last arriveTime
    for (int i = numAttractions - 1; i >= 0; i--) {
      int node = order.get(i);

      long openingTime = vrptwDataModel.timeWindows.data[node][0];
      long closingTime = vrptwDataModel.timeWindows.data[node][1];
      long stayTime = vrptwDataModel.stayTimes[node - 1];
      long idleTime = 0;

      if (curTime < openingTime) {
        // System.out.println("Invalid route.");
        return new TravelSchedule(null, null, null, null, null, 0, false);
      } else {
        if (closingTime < curTime) {
          idleTime = curTime - closingTime;
          idleTimes[i] = (double) idleTime / TimeUtils.minutesPerHour;
          curTime = closingTime; // need to stay idle until the travaller can leave for the next
          // attraction
        }
        arriveTimes[i] = (double) curTime / TimeUtils.minutesPerHour;
        leaveTimes[i] = (double) (curTime + stayTime) / TimeUtils.minutesPerHour;
        // move to the last attraction
        if (i > 0) {
          int prevNode = order.get(i - 1);
          long transitTime = vrptwDataModel.timeMatrix.data[prevNode][node];
          long prevStayTime = vrptwDataModel.stayTimes[prevNode - 1];
          long transportationTime = transitTime - prevStayTime;

          curTime = curTime - transitTime;
          transportationTimes[i - 1] = (double) transportationTime / TimeUtils.minutesPerHour;
        }
      }
    }
    // System.out.println("Total transportation time: " + sumTimes(transportationTimes));
    // System.out.println("total idle time: " + sumTimes(idleTimes));

    return new TravelSchedule(
        Ints.toArray(order), arriveTimes, leaveTimes, transportationTimes, idleTimes, 0, true);
  }

  public static String[] getPlaceIdsFromAttractions(Attraction[] attractions) {
    String[] placeIds = new String[attractions.length];

    for (int i = 0; i < placeIds.length; i++) {
      String placeId = "place_id:" + attractions[i].placeId;
      placeIds[i] = placeId;
    }

    return placeIds;
  }

  public static TimeWindows getTimeWindowsFromAttractions(
      Attraction[] attractions, int departureDay) {
    long[][] data =
        new long[attractions.length + 1][2]; // +1: dummy row, 2: openingTime & closingTime
    // dummy depot
    data[0][0] = 0;
    data[0][1] = TimeUtils.minutesPerDay;

    for (int row = 1; row < data.length; row++) {
      double openingTime = attractions[row - 1].constraint.openingTimes[departureDay];
      double closingTime = attractions[row - 1].constraint.closingTimes[departureDay];

      // TODO: Handle "not-open" exception

      // Handle cross-day [open, close] intervals
      if (closingTime < openingTime) {
        closingTime = 24.0;
      }

      long openingTimeInMinutes = Math.round(openingTime * TimeUtils.minutesPerHour);
      long closingTimeInMinutes = Math.round(closingTime * TimeUtils.minutesPerHour);

      data[row][0] = openingTimeInMinutes;
      data[row][1] = closingTimeInMinutes;
    }

    TimeWindows timeWindows = new TimeWindows(data);
    return timeWindows;
  }

  public static long[] getStayTimesFromAttractions(Attraction[] attractions) {
    long[] stayTimes = new long[attractions.length];

    for (int i = 0; i < stayTimes.length; i++) {
      long stayTime = Math.round(attractions[i].constraint.stayTime * TimeUtils.minutesPerHour);
      stayTimes[i] = stayTime;
    }

    return stayTimes;
  }

  public static void printStayTimes(long[] stayTimes) {
    System.out.println("Displaying the stay times (in minutes):");
    for (long stayTime : stayTimes) {
      System.out.println(stayTime);
    }
  }

  public static double sumTimes(double[] times) {
    double s = 0;
    for (double time : times) {
      s += time;
    }
    return s;
  }
}
