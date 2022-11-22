package com.travelight.backend;

public class Constraint {
    double[] openingTimes = new double[7];
    double[] closeTimes = new double[7];
    double stayTime;
    String transportation;

    public double[] getOpeningTimes() {
        return this.openingTimes;
    }

    public void setOpeningTimes(double[] openingTimes) {
        this.openingTimes = openingTimes;
    }

    public double[] getCloseTimes() {
        return this.closeTimes;
    }

    public void setCloseTimes(double[] closeTimes) {
        this.closeTimes = closeTimes;
    }

    public double getStayTime() {
        return this.stayTime;
    }

    public void setStayTime(double stayTime) {
        this.stayTime = stayTime;
    }

    public String getTransportation() {
        return this.transportation;
    }

    public void setTransportation(String transportation) {
        this.transportation = transportation;
    }
}
