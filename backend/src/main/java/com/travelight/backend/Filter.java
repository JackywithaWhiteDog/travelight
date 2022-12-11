package com.travelight.backend;

import com.google.maps.model.PlacesSearchResult;
import java.util.HashSet;

public class Filter {
  private int minComments;
  private float minRating;
  HashSet<String> validPlace;

  Filter(float minRating, int minComments) {
    this.minRating = minRating;
    this.minComments = minComments;
    initDefaultPlace();
  }

  boolean verify(PlacesSearchResult result) {
    // Check if given place satisfy all pre-defined constraint.
    boolean check = false;
    // Check if exists valid type of place.
    for (String s : result.types) {
      if (validPlace.contains(s)) check = true;
    }

    // Check if satisfy constraints.
    if (result.rating < minRating) check = false;
    if (result.userRatingsTotal < minComments) check = false;
    if (result.photos == null) check = false;

    return check;
  }

  private void initDefaultPlace() {
    validPlace = new HashSet<>();
    validPlace.add("library");
    validPlace.add("airport");
    validPlace.add("aquarium");
    validPlace.add("art_gallery");
    validPlace.add("book_store");
    validPlace.add("cafe");
    validPlace.add("church");
    validPlace.add("clothing_store");
    validPlace.add("department_store");
    validPlace.add("amusement_park");
    validPlace.add("jewelry_store");
    validPlace.add("zoo");
    validPlace.add("movie_theater");
    validPlace.add("post_office");
    validPlace.add("restaurant");
    validPlace.add("shopping_mall");
    validPlace.add("tourist_attraction");
    validPlace.add("train_station");
    validPlace.add("amusement_park");
  }

  @Override
  public String toString() {
    return "MinRating: "
        + minRating
        + System.lineSeparator()
        + "MinComments: "
        + minComments
        + System.lineSeparator()
        + "Valid place type: "
        + validPlace;
  }
}
