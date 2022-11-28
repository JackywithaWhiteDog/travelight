package com.travelight.backend;

public class TimeWindows {
    public final int notOpenValue = -1;
    long[][] data;


    public TimeWindows(long[][] data) {
        this.data = data;
    }

    public long[][] getData() {
        return this.data;
    }

    public void setData(long[][] data) {
        this.data = data;
    }

    public void printWindows() {
        System.out.println("Displaying the time windows (in minutes):");
        for (int row = 0; row < this.data.length; row++) {
            for (int col = 0; col < this.data[0].length; col++) {
                String longStr = Long.toString(this.data[row][col]);
                System.out.print(longStr + ' ');
            }
            System.out.println();
        }
    }
}
