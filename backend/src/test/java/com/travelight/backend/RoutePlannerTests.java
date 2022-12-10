package com.travelight.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class RoutePlannerTests {

  @Test
  @DisplayName("Normal time windows")
  void normalTimeWindows() {
    long[][] data = {
      {0, 1440},
      {52, 350},
      {30, 500}
    };
    TimeWindows timeWindows = new TimeWindows(data);
    assertEquals(true, RoutePlanner.isValidTimeWindows(timeWindows));
  }

  @Test
  @DisplayName("Open > Close")
  void openGreaterThanCloseTimeWindows() {
    long[][] data = {
      {0, 1440},
      {520, 35},
      {30, 500}
    };
    TimeWindows timeWindows = new TimeWindows(data);
    assertEquals(false, RoutePlanner.isValidTimeWindows(timeWindows));
  }

  @Test
  @DisplayName("Contain Not-Open Attractions")
  void notOpenTimeWindows() {
    long[][] data = {
      {0, 1440},
      {-1, -1},
      {520, 835},
      {30, 500}
    };
    TimeWindows timeWindows = new TimeWindows(data);
    assertEquals(false, RoutePlanner.isValidTimeWindows(timeWindows));
  }
}
