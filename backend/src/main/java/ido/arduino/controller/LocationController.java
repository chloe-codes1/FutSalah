package ido.arduino.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ido.arduino.dto.LocationDto;
import ido.arduino.service.LocationService;

@Controller
@RequestMapping("/api")
public class LocationController {

	@Autowired
	private LocationService locationService;
	
	@GetMapping("/location/{locationID}")
	public @ResponseBody LocationDto getLocationInfo(@PathVariable int locationID) {
		return locationService.getLocationInfo(locationID);
	}
	
	@GetMapping("/location")
	public @ResponseBody List<LocationDto> getAllLocationInfo(){
		return locationService.getAllLocationInfo();
	}
	
	@PostMapping("/location")
	public @ResponseBody List<LocationDto> getLocationBySido(@RequestBody Map<String, String> data){
		String sido = data.get("sido");
		return locationService.getLocationBySido(sido);
	}
	
}
