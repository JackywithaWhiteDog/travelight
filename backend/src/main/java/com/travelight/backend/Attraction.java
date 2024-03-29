package com.travelight.backend;

public class Attraction {
  int comments;
  String placeId;
  String name;
  String pictureURL;
  String address;
  double rating;
  GeoLocation geoLocation;
  Constraint constraint;

  public Attraction(
      String placeId,
      String address,
      double rating,
      GeoLocation geoLocation,
      Constraint constraint,
      String pictureURL,
      String name,
      int comments) {
    this.name = name;
    this.rating = rating;
    this.placeId = placeId;
    this.address = address;
    this.comments = comments;
    this.pictureURL = pictureURL;
    this.geoLocation = geoLocation;
    this.constraint = constraint;
  }

  public int getComments() {
    return this.comments;
  }

  public void setComments(int comments) {
    this.comments = comments;
  }

  public String getPlaceId() {
    return this.placeId;
  }

  public void setPlaceId(String placeId) {
    this.placeId = placeId;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPictureURL() {
    return this.pictureURL;
  }

  public void setPictureURL(String pictureURL) {
    this.pictureURL = pictureURL;
  }

  public String getAddress() {
    return this.address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public double getRating() {
    return this.rating;
  }

  public void setRating(double rating) {
    this.rating = rating;
  }

  public GeoLocation getGeoLocation() {
    return this.geoLocation;
  }

  public void setGeoLocation(GeoLocation geoLocation) {
    this.geoLocation = geoLocation;
  }

  public Constraint getConstraint() {
    return this.constraint;
  }

  public void setConstraint(Constraint constraint) {
    this.constraint = constraint;
  }

  @Override
  public String toString() {
    return "{"
        + " placeId='"
        + getPlaceId()
        + "'"
        + ", name='"
        + getName()
        + "'"
        + ", pictureURL='"
        + getPictureURL()
        + "'"
        + ", address='"
        + getAddress()
        + "'"
        + ", rating='"
        + getRating()
        + "'"
        + ", geoLocation='"
        + getGeoLocation()
        + "'"
        + ", constraint='"
        + getConstraint()
        + "'"
        + "}";
  }
}
