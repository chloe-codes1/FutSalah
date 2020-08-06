package ido.arduino.service;

import ido.arduino.dto.LocationDto;

public interface LocationService {
	LocationDto getLocationInfo (int locationID);
}
