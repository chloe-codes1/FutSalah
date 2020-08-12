package ido.arduino.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ido.arduino.dao.LocationMapper;
import ido.arduino.dto.LocationDto;

@Service
public class LocationServiceImpl implements LocationService{
	
	@Autowired
	LocationMapper locationMapper;

	@Override
	public LocationDto getLocationInfo(int locationID) {
		return locationMapper.getLocationInfo(locationID);
	}

	@Override
	public List<LocationDto> getAllLocationInfo() {
		return locationMapper.getAllLocationInfo();
	}

	@Override
	public List<LocationDto> getLocationBySido(String sido) {
		return locationMapper.getLocationBySido(sido);
	}
	
}
