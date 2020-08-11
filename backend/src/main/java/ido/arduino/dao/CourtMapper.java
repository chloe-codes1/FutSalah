package ido.arduino.dao;

import org.apache.ibatis.annotations.Mapper;

import ido.arduino.dto.CourtAdminDTO;

@Mapper
public interface CourtMapper {
	public String checkValid(String id);
	public CourtAdminDTO login(String id);
}
