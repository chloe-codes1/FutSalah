package ido.arduino.repo;

import java.util.List;

import ido.arduino.dto.MyTeamDto;
import ido.arduino.dto.TeamInfoDto;
import ido.arduino.dto.TeamInfoSimpleDto;
import ido.arduino.dto.UserDTO;
import ido.arduino.dto.UserTeamConnDto;

public interface TeamInfoRepo {

	// 팀생성 
	int insert(TeamInfoDto info);

	int selectlast();
	int updatemy(UserDTO userID);
	//int insertmy(UserDTO uteam);
	// 나의 팀 정보
	public List<MyTeamDto> selectAllmyteam(String id);
		
	int update(TeamInfoDto info);

	int delete(String teamID);

	// 팀찾기 페이지 간단 정보
	public List<TeamInfoSimpleDto> selectAll();

	int insertmy(UserTeamConnDto uteam);

}
