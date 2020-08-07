package ido.arduino.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ido.arduino.dto.TeamInfoDto;
import ido.arduino.dto.UserDTO;

@Mapper
public interface TeamMapper {
	TeamInfoDto getTeamInfo(int teamID);
	int checkIfExists(String name);
	List<UserDTO> getAllCrewInfo(int teamID);
	List<TeamInfoDto> searchTeamByName(String name);
	int getNextTeamId();
	void uploadProfileImage(int teamID, String uniqueFileName);
	int deleteCrew(int teamID, int userID);
}