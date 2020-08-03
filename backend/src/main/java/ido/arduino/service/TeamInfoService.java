package ido.arduino.service;

import java.util.List;

import ido.arduino.dto.LocationDto;
import ido.arduino.dto.MyTeamDto;
import ido.arduino.dto.TeamInfoDto;
import ido.arduino.dto.TeamInfoSimpleDto;
import ido.arduino.dto.UserTeamConnDto;

public interface TeamInfoService {

	int insert(TeamInfoDto info);

	int update(TeamInfoDto info);

	int delete(String teamID);

	List<TeamInfoSimpleDto> selectAll(); // 팀찾기에서 간단한 항목

	List<MyTeamDto> selectAllmyteam(String id); // 나의 팀 목록
	
	

}
