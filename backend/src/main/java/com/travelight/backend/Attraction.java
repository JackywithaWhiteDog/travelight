package com.travelight.backend;

import com.travelight.backend.GeoLocation;
import com.travelight.backend.Constraint;

public class Attraction {
    String placeId;
    String address;
    double rating;
    GeoLocation geoLocation;
    Constraint constraint;

    public Attraction(String placeId, String address, double rating, GeoLocation geoLocation, Constraint constraint) {
        this.placeId = placeId;
        this.address = address;
        this.rating = rating;
        this.geoLocation = geoLocation;
        this.constraint = constraint;
    }

    public String getPlaceId() {
        return this.placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
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
}
