package com.travelight.backend;

public class OptimizationInfo {
  boolean check;
  int departureDay;
  String transportation;
  Attraction[] attractions;

  public OptimizationInfo(boolean check, int departureDay, Attraction[] attractions) {
    this.check = check;
    this.departureDay = departureDay;
    this.attractions = attractions;
  }

  public boolean isCheck() {
    return this.check;
  }

  public boolean getCheck() {
    return this.check;
  }

  public void setCheck(boolean check) {
    this.check = check;
  }

  public int getDepartureDay() {
    return this.departureDay;
  }

  public void setDepartureDay(int departureDay) {
    this.departureDay = departureDay;
  }

  public String getTransportation() {
    return this.transportation;
  }

  public void setTransportation(String transportation) {
    this.transportation = transportation;
  }

  public Attraction[] getAttractions() {
    return this.attractions;
  }

  public void setAttractions(Attraction[] attractions) {
    this.attractions = attractions;
  }

  @Override
  public String toString() {
    return "{"
        + " check='"
        + isCheck()
        + "'"
        + ", departureDay='"
        + getDepartureDay()
        + "'"
        + ", attractions='"
        + getAttractions()
        + "'"
        + "}";
  }
}
