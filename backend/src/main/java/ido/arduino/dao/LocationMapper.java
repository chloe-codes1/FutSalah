package ido.arduino.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ido.arduino.dto.LocationDto;

@Mapper
public interface LocationMapper {
	LocationDto getLocationInfo (int locationID);
	List<LocationDto> getAllLocationInfo();
}
