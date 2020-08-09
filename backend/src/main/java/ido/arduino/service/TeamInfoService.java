package ido.arduino.service;

import java.util.List;

import ido.arduino.dto.Formation;
import ido.arduino.dto.MyTeamDto;
import ido.arduino.dto.TeamInfoDto;
import ido.arduino.dto.TeamInfoSimpleDto;
import ido.arduino.dto.TeamLeaderDTO;
import ido.arduino.dto.UserDTO;
import ido.arduino.dto.UserTeamConnDto;

public interface TeamInfoService {

	
	//----------------create team---------------------------
	int insert(TeamInfoDto info);
	int checkIfExists(String name);
	int update(TeamInfoDto info);
	int delete(String teamID);

	//----------------myteam---------------------------
	int insertmy(UserTeamConnDto uteam);
	int updatemy(UserDTO userID);
	List<MyTeamDto> selectAllmyteam(String id); // 나의 팀 목록
	
	//----------------findteam---------------------------
	List<TeamInfoSimpleDto> selectAll(); // 팀찾기에서 간단한 항목
	

	
	//----------------team info---------------------------
	TeamInfoDto getTeamInfo(int teamID);
	TeamLeaderDTO getTeamLeaderInfo(int teamID);
	List<UserDTO> getAllCrewInfo(int teamID);
	List<TeamInfoDto> searchTeamByName(String name);
	int getNextTeamId();
	int deleteCrew(int teamID, int userID);


	
	//----------------formation---------------------------
	
	int insertformation(Formation form);
	int updateformation(Formation form);
	int deleteformation(int grid);
	List<Formation> selectformation(); 
	

}
