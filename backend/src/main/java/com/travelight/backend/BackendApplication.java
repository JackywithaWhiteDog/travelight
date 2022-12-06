package com.travelight.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
				registry.addMapping("/optimize").allowedOrigins();
				registry.addMapping("/nearbyAttractions").allowedOrigins();
			}
		};
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
