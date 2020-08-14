package ido.arduino.dao;

import org.apache.ibatis.annotations.Mapper;

import ido.arduino.dto.CourtAdminDTO;
import ido.arduino.dto.CourtDTO;

@Mapper
public interface CourtMapper {
	public String checkValid(String id);
	public CourtAdminDTO login(String id);
	CourtDTO getCourtInfo(int courtID);
}
