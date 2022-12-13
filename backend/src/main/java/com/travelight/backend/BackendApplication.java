package com.travelight.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@RestController
public class BackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(BackendApplication.class, args);
  }

  @Bean
  // Enable CORS globally.
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/optimize");
        registry.addMapping("/nearbyAttractions");
      }
    };
  }

  @GetMapping("/test")
  public String test() {
    System.out.println("test:\n");

    long[][] timeMatrixData = {
        // {0, 0, 0, 0},
        // {0, 0, 3, 40},
        // {0, 5000, 0, 1},
        // {0, 4, 1, 0},
        { 0, 0, 0, 0 },
        { 0, 0, 19, 24 },
        { 0, 19, 0, 23 },
        { 0, 24, 23, 0 }
    };
    long[][] timeWindowsData = {
        // {0, 1440},
        // {0, 10},
        // {4, 8},
        // {0, 12},
        { 0, 1440 },
        { 900, 1440 },
        { 480, 1140 },
        { 480, 1140 }
    };
    long[] stayTimes = { 60, 90, 60 };
    TimeMatrix timeMatrix = new TimeMatrix(false, timeMatrixData);
    TimeWindows timeWindows = new TimeWindows(timeWindowsData);

    VrptwDataModel vrptwDataModel = new VrptwDataModel(timeMatrix, timeWindows, stayTimes);
    vrptwDataModel.transformDataByStayTimes();
    vrptwDataModel.timeMatrix.printMatrix();
    vrptwDataModel.timeWindows.printWindows();

    VrptwSolver.solve(vrptwDataModel);

    return "completed";
  }

  @PostMapping("/optimize")
  public TravelSchedule optimizeTravelSchedule(@RequestBody OptimizationInfo optimizationInfo) {
    // Logging
    System.out.println("Request received:\n" + optimizationInfo.toString());

    // Generate travelSchedule
    TravelSchedule travelSchedule = RoutePlanner.planTravelSchedule(optimizationInfo);
    return travelSchedule;
  }
}
