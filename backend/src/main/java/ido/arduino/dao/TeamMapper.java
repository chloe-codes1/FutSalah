package ido.arduino.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ido.arduino.dto.TeamInfoDto;
import ido.arduino.dto.TeamLeaderDTO;
import ido.arduino.dto.TeamLocationDTO;
import ido.arduino.dto.UserDTO;

@Mapper
public interface TeamMapper {
	TeamInfoDto getTeamInfo(int teamID);

	TeamLeaderDTO getTeamLeaderInfo(int teamID);

	int checkIfExists(String name);

	List<UserDTO> getAllCrewInfo(int teamID);

	List<TeamLocationDTO> searchTeamByName(String name, int page);

	List<TeamLocationDTO> searchTeamByLocation(String gu, int page);

	List<TeamLocationDTO> searchTeamByBoth(String name, String gu, int page);

	int getNextTeamId();

	void uploadProfileImage(int teamID, String uniqueFileName);

	int deleteCrew(int teamID, int userID);

	int deleteformation2(int teamID, int userID);
	
	int checkIfFormationExists(int teamID, int userID);

	int getNumberOfCrews(int teamID);

	int getNextLeader(int userID, int teamID);

	int updateLeader(int userID, int teamID);
}