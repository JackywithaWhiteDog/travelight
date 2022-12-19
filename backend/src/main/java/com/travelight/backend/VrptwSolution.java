package com.travelight.backend;

public class VrptwSolution {
  boolean hasSolution;
  int[] order;

  public VrptwSolution(boolean hasSolution, int[] order) {
    this.hasSolution = hasSolution;
    this.order = order;
  }

  public boolean isHasSolution() {
    return this.hasSolution;
  }

  public boolean getHasSolution() {
    return this.hasSolution;
  }

  public void setHasSolution(boolean hasSolution) {
    this.hasSolution = hasSolution;
  }

  public int[] getOrder() {
    return this.order;
  }

  public void setOrder(int[] order) {
    this.order = order;
  }
}
