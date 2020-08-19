package ido.arduino.dao;

import org.apache.ibatis.annotations.Mapper;

import ido.arduino.dto.CourtAdminDTO;
import ido.arduino.dto.CourtDTO;
import ido.arduino.dto.ResultDto;

@Mapper
public interface CourtMapper {
	public String checkValid(String id);
	public CourtAdminDTO login(String id);
	CourtDTO getCourtInfo(int courtID);
	public void reliability(String name, int much);
	public void modifyWinRecord(String name);
	public void modifyDrawRecord(String name);
	public void modifyDefeatRecord(String name);
	public void modifyPoints(String name);
	public void insertResult(ResultDto data);
}
