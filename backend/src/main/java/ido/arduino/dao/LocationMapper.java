package ido.arduino.dao;

import org.apache.ibatis.annotations.Mapper;

import ido.arduino.dto.LocationDto;

@Mapper
public interface LocationMapper {
	LocationDto getLocationInfo (int locationID);
}
