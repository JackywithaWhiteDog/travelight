package com.travelight.backend;

import com.google.maps.NearbySearchRequest;
import com.google.maps.model.Geometry;
import com.google.maps.model.LatLng;
import com.google.maps.model.Photo;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;
import java.util.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NearbySearchAPI extends GoogleMapAPI {

  @GetMapping("/nearbyAttractions")
  public List<Attraction> getNearbyAttractions(
      @RequestParam String latitude,
      @RequestParam String longitude,
      @RequestParam(defaultValue = "1.0") String minRating,
      @RequestParam(defaultValue = "1") String minComments) {
    NearbySearchRequest request = new NearbySearchRequest(context);

    PlacesSearchResponse response =
        request
            .location(new LatLng(Double.parseDouble(latitude), Double.parseDouble(longitude)))
            .radius(1500)
            .language("zh-TW")
            .awaitIgnoreError();

    List<Attraction> attractions =
        parseResult(
            response.results, new Filter(Float.valueOf(minRating), Integer.valueOf(minComments)));

    return attractions;
  }

  List<Attraction> parseResult(PlacesSearchResult results[], Filter filter) {
    List<Attraction> attractions = new ArrayList<>();

    Thread[] threads = new Thread[results.length];

    DetailsAPI[] details = new DetailsAPI[results.length];

    for (int t = 0; t < results.length; t++) {
      PlacesSearchResult result = results[t];
      // Check if the result satisfy all additional constraints.
      if (filter.verify(result)) {
        // Generate detail information for each attraction.
        Geometry geo = result.geometry;

        Photo photo = result.photos[0];

        Attraction attraction =
            new Attraction(
                result.placeId,
                result.formattedAddress,
                Math.round(result.rating * 10) / 10.0,
                new GeoLocation(geo.location),
                null,
                photo.photoReference,
                result.name,
                result.userRatingsTotal);
        // Async
        details[t] = new DetailsAPI(attraction);
        threads[t] = new Thread(details[t]);
        threads[t].start();
      }
    }

    for (int t = 0; t < results.length; t++) {
      if (filter.verify(results[t])) {
        try {
          // Wait for job done
          threads[t].join();
          attractions.add(details[t].getAttraction());
        } catch (InterruptedException e) {
          throw new RuntimeException(e);
        }
      }
    }

    return attractions;
  }
}
