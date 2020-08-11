package ido.arduino.service;

import java.util.List;

import ido.arduino.dto.LocationDto;

public interface LocationService {
	LocationDto getLocationInfo (int locationID);
	List<LocationDto> getAllLocationInfo();
	List<LocationDto> getLocationBySido(String sido);
}
