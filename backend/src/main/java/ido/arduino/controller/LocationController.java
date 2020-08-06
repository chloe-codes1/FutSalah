package ido.arduino.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
}
