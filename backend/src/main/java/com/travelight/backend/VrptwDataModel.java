package com.travelight.backend;

public class VrptwDataModel {
    TimeMatrix timeMatrix;
    TimeWindows timeWindows;
    long[] stayTimes;
    public final int vehicleNumber = 1;
    public final int depot = 0;

    public VrptwDataModel(TimeMatrix timeMatrix, TimeWindows timeWindows, long[] stayTimes) {
        this.timeMatrix = timeMatrix;
        this.timeWindows = timeWindows;
        this.stayTimes = stayTimes;
    }

    public void transformDataByStayTimes() {
        for (int i = 0; i < this.stayTimes.length; i++) {
            long stayTime = this.stayTimes[i];
            // transform the timeMatrix
            int row = i + 1;
            for (int col = 1; col < this.timeMatrix.data[0].length; col++) {
                if (col != row) {
                    this.timeMatrix.data[row][col] += stayTime;
                }
            }
            // transform the timeWindows
            this.timeWindows.data[row][1] -= stayTime; // NOTE: it is possible that this lead to openingTime > closingTime
        }
    }

    public TimeMatrix getTimeMatrix() {
        return this.timeMatrix;
    }

    public void setTimeMatrix(TimeMatrix timeMatrix) {
        this.timeMatrix = timeMatrix;
    }

    public TimeWindows getTimeWindows() {
        return this.timeWindows;
    }

    public void setTimeWindows(TimeWindows timeWindows) {
        this.timeWindows = timeWindows;
    }

    public long[] getStayTimes() {
        return this.stayTimes;
    }

    public void setStayTimes(long[] stayTimes) {
        this.stayTimes = stayTimes;
    }

    public int getVehicleNumber() {
        return this.vehicleNumber;
    }

    public int getDepot() {
        return this.depot;
    }
}
