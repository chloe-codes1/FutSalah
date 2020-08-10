package ido.arduino.repo;

import java.util.List;

import ido.arduino.dto.Formation;
import ido.arduino.dto.MyTeamDto;
import ido.arduino.dto.TeamInfoDto;
import ido.arduino.dto.TeamInfoSimpleDto;
import ido.arduino.dto.UserDTO;
import ido.arduino.dto.UserTeamConnDto;

public interface TeamInfoRepo {

 
	//----------------create team---------------------------


	int insert(TeamInfoDto info);
	int update(TeamInfoDto info);
	int delete(int teamID);
	
	
	//----------------find team---------------------------
	
	public List<TeamInfoSimpleDto> selectAll();

	
	//----------------my team---------------------------
	int selectlast();	// 가장 최근 생성한 팀 
	int insertmy(UserTeamConnDto uteam); //userteamconn에 목록 넣기 
	int updatemy(UserDTO userID);
	public List<MyTeamDto> selectAllmyteam(int id);
	
	
	//----------------formation---------------------------
	int insertformation(Formation form);
	int updateformation(Formation form);
	int deleteformation(int grid);
	public List<Formation> selectformation();

	



}
