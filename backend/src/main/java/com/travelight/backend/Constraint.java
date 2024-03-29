package com.travelight.backend;

public class Constraint {
  double[] openingTimes = new double[7];
  double[] closingTimes = new double[7];
  double stayTime;

  public Constraint(double[] openingTimes, double[] closingTimes, double stayTime) {
    this.openingTimes = openingTimes;
    this.closingTimes = closingTimes;
    this.stayTime = stayTime;
  }

  public double[] getOpeningTimes() {
    return this.openingTimes;
  }

  public void setOpeningTimes(double[] openingTimes) {
    this.openingTimes = openingTimes;
  }

  public double[] getClosingTimes() {
    return this.closingTimes;
  }

  public void setClosingTimes(double[] closingTimes) {
    this.closingTimes = closingTimes;
  }

  public double getStayTime() {
    return this.stayTime;
  }

  public void setStayTime(double stayTime) {
    this.stayTime = stayTime;
  }

  @Override
  public String toString() {
    return "{"
        + " openingTimes='"
        + getOpeningTimes()
        + "'"
        + ", closingTimes='"
        + getClosingTimes()
        + "'"
        + ", stayTime='"
        + getStayTime()
        + "'"
        + "}";
  }
}
