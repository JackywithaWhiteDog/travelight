package com.travelight.backend;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.FileCopyUtils;

import com.google.maps.GeoApiContext;
import com.google.gson.Gson; 
import com.google.gson.GsonBuilder;

public class GoogleMapAPI {
	static String apiKey = readAPIKey();

	public static final GeoApiContext context = new GeoApiContext.Builder()
		.apiKey(apiKey)
		.build();
	public static final Gson gson = new GsonBuilder().setPrettyPrinting().create();

	public static String readAPIKey() {
		Resource resource = new ClassPathResource("classpath:key.txt");
		String apiKey = "";
		try {
			InputStream inputStream = resource.getInputStream();
			byte[] bdata = FileCopyUtils.copyToByteArray(inputStream);
			apiKey = new String(bdata, StandardCharsets.UTF_8);
		} catch (IOException ioe) {
			System.out.println(ioe);
		}
		return apiKey;
	}
}
