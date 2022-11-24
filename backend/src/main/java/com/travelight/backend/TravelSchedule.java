package com.travelight.backend;

public class TravelSchedule {
    int[] order;
    double[] arriveTimes;
    double[] leaveTimes;
    boolean isValid;

    public TravelSchedule(int[] order, double[] arriveTimes, double[] leaveTimes, boolean isValid) {
        this.order = order;
        this.arriveTimes = arriveTimes;
        this.leaveTimes = leaveTimes;
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
