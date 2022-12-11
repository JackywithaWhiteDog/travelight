package com.travelight.backend;

import com.google.maps.PlaceDetailsRequest;
import com.google.maps.model.OpeningHours.Period;
import com.google.maps.model.PlaceDetails;
import java.util.*;

public class DetailsAPI extends GoogleMapAPI implements Runnable {
  private Attraction attraction;

  public DetailsAPI(Attraction attraction) {
    this.attraction = attraction;
  }

  @Override
  public void run() {
    synchronized (this) {
      this.attraction = getDetailInfo(this.attraction);
      notify();
    }
  }

  public void setAttraction(Attraction attraction) {
    this.attraction = attraction;
  }

  public Attraction getAttraction() {
    return this.attraction;
  }

  public static Attraction getDetailInfo(Attraction attraction) {
    String placeID = attraction.getPlaceId();
    // Testing examples
    // placeID = "ChIJJ9z7h9OtQjQR8vwZA7PhkKs"; // Test cross day
    // placeID = "ChIJN1t_tDeuEmsRUsoyG83frY4"; // Test only five day
    PlaceDetailsRequest request = new PlaceDetailsRequest(context);
    PlaceDetails response = request.language("zh-TW").placeId(placeID).awaitIgnoreError();

    String formattedAddress = response.formattedAddress;

    attraction.setAddress(formattedAddress);

    // Add open and close constraint.
    if (response.openingHours == null) {
      double[] openingTimes = new double[] {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0};
      double[] closingTimes = new double[] {24.0, 24.0, 24.0, 24.0, 24.0, 24.0, 24.0};
      attraction.setConstraint(new Constraint(openingTimes, closingTimes, 1));
    } else {
      // Set open and close time in one week.
      Period[] periods = response.openingHours.periods;
      double[] openingTimes = new double[] {-1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0};
      double[] closingTimes = new double[] {-1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0};

      Hashtable<String, Integer> day2idx = new Hashtable<>();
      day2idx.put("Sunday", 0);
      day2idx.put("Monday", 1);
      day2idx.put("Tuesday", 2);
      day2idx.put("Wednesday", 3);
      day2idx.put("Thursday", 4);
      day2idx.put("Friday", 5);
      day2idx.put("Saturday", 6);

      double openTime;
      double closeTime;
      for (int i = 0; i < periods.length; i++) {
        Period p = periods[i];
        int day = day2idx.get(p.open.day.getName());
        if (p.open == null) {
          openTime = 0.0;
        } else {
          openTime =
              Double.valueOf(p.open.time.getHour()) + Double.valueOf(p.open.time.getMinute()) / 60;
        }

        if (p.close == null) {
          closeTime = 24.0;
        } else {
          closeTime =
              (p.open.day.getName().equals(p.close.day.getName()))
                  ? Double.valueOf(p.close.time.getHour())
                      + Double.valueOf(p.close.time.getMinute()) / 60
                  : 24.0;
        }
        openingTimes[day] =
            (openingTimes[day] == -1) ? openTime : Math.min(openingTimes[day], openTime);
        closingTimes[day] =
            (closingTimes[day] == -1) ? closeTime : Math.max(closingTimes[day], closeTime);
      }

      // for (int i = 0; i < 7; i++) {
      // System.out.print("Day: ");
      // System.out.println(i);
      // System.out.println(openingTimes[i]);
      // System.out.println(closingTimes[i]);
      // }
      attraction.setConstraint(new Constraint(openingTimes, closingTimes, 1));
    }

    return attraction;
  }
}
