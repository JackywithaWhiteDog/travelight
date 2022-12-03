package com.travelight.backend;

public class TravelSchedule {
    int[] order;
    double[] arriveTimes;
    double[] leaveTimes;
    double[] transportationTimes;
    double[] idleTimes;
    double savedTime;
    boolean isValid;

    public TravelSchedule(int[] order, double[] arriveTimes, double[] leaveTimes, double[] transportationTimes, double[] idleTimes, double savedTime, boolean isValid) {
        this.order = order;
        this.arriveTimes = arriveTimes;
        this.leaveTimes = leaveTimes;
        this.transportationTimes = transportationTimes;
        this.idleTimes = idleTimes;
        this.savedTime = savedTime;
        this.isValid = isValid;
    }

    public int[] getOrder() {
        return this.order;
    }

    public void setOrder(int[] order) {
        this.order = order;
    }

    public double[] getArriveTimes() {
        return this.arriveTimes;
    }

    public void setArriveTimes(double[] arriveTimes) {
        this.arriveTimes = arriveTimes;
    }

    public double[] getLeaveTimes() {
        return this.leaveTimes;
    }

    public void setLeaveTimes(double[] leaveTimes) {
        this.leaveTimes = leaveTimes;
    }

    public double[] getTransportationTimes() {
        return this.transportationTimes;
    }

    public void setTransportationTimes(double[] transportationTimes) {
        this.transportationTimes = transportationTimes;
    }

    public double[] getIdleTimes() {
        return this.idleTimes;
    }

    public void setIdleTimes(double[] idleTimes) {
        this.idleTimes = idleTimes;
    }

    public double getSavedTime() {
        return this.savedTime;
    }

    public void setSavedTime(double savedTime) {
        this.savedTime = savedTime;
    }

    public boolean isIsValid() {
        return this.isValid;
    }

    public boolean getIsValid() {
        return this.isValid;
    }

    public void setIsValid(boolean isValid) {
        this.isValid = isValid;
    }


    @Override
    public String toString() {
        return "{" +
            " order='" + getOrder() + "'" +
            ", arriveTimes='" + getArriveTimes() + "'" +
            ", leaveTimes='" + getLeaveTimes() + "'" +
            ", isValid='" + isIsValid() + "'" +
            "}";
    }
}
