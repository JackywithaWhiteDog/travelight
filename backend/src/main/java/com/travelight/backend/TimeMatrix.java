package com.travelight.backend;

public class TimeMatrix {
    boolean isEmpty;
    long[][] data;

    public TimeMatrix(boolean isEmpty, long[][] data) {
        this.isEmpty = isEmpty;
        this.data = data;
    }

    public boolean isIsEmpty() {
        return this.isEmpty;
    }

    public boolean getIsEmpty() {
        return this.isEmpty;
    }

    public void setIsEmpty(boolean isEmpty) {
        this.isEmpty = isEmpty;
    }

    public long[][] getData() {
        return this.data;
    }

    public void setData(long[][] data) {
        this.data = data;
    }

    public void printMatrix() {
        System.out.println("Displaying the time matrix (in minutes):");
        if (this.isEmpty) {
            System.out.println("This matrix is empty.");
        } else {
            for (int row = 0; row < this.data.length; row++) {
                System.out.println();
                for (int col = 0; col < this.data[0].length; col++) {
                    String longStr = Long.toString(this.data[row][col]);
                    System.out.print(longStr + ' ');
                }
                System.out.println();
            }
        }
    }    
}
