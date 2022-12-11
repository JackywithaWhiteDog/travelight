package com.travelight.backend;

import com.google.maps.model.LatLng;

public class GeoLocation {
  double latitude;
  double longitude;

  public GeoLocation(double latitude, double longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public GeoLocation(LatLng location) {
    this.latitude = location.lat;
    this.longitude = location.lng;
  }

  public double getLatitude() {
    return this.latitude;
  }

  public void setLatitude(double latitude) {
    this.latitude = latitude;
  }

  public double getLongitude() {
    return this.longitude;
  }

  public void setLongitude(double longitude) {
    this.longitude = longitude;
  }

  @Override
  public String toString() {
    return "{" + " latitude='" + getLatitude() + "'" + ", longitude='" + getLongitude() + "'" + "}";
  }
}
