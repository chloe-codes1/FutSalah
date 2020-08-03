package ido.arduino.dao;

import org.apache.ibatis.annotations.Mapper;

import ido.arduino.dto.TeamInfoDto;

@Mapper
public interface TeamMapper {
	TeamInfoDto getTeamInfo(int teamID);
	int checkIfExists(String name);
}
