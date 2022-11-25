package com.travelight.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@SpringBootApplication
@RestController
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@PostMapping("/optimize")
	public TravelSchedule optimizeTravelSchedule(@RequestBody OptimizationInfo optimizationInfo) {
		// Logging
		System.out.println(optimizationInfo);
		System.out.println(optimizationInfo.getAttractions()[0]);
		System.out.println(optimizationInfo.getAttractions()[0].getConstraint().getOpeningTimes().length);
		System.out.println(optimizationInfo.getAttractions()[0].getConstraint().getClosingTimes().length);

		// Generate travelSchedule
		boolean performCheck = optimizationInfo.getCheck();
		Attraction[] attractions = optimizationInfo.getAttractions();
		int departureDay = optimizationInfo.getDepartureDay();
		TravelSchedule travelSchedule;
		if (performCheck) {
			travelSchedule = RoutePlanner.checkOrder(attractions, departureDay);
		} else {
			travelSchedule = RoutePlanner.optimizeOrder(attractions, departureDay);
		}
		return travelSchedule;
	}
}
