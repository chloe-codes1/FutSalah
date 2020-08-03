package ido.arduino.repo;

import java.util.List;

import ido.arduino.dto.LocationDto;
import ido.arduino.dto.MyTeamDto;
import ido.arduino.dto.TeamInfoDto;
import ido.arduino.dto.TeamInfoSimpleDto;
import ido.arduino.dto.UserTeamConnDto;

public interface TeamInfoRepo {

	int insert(TeamInfoDto info);

	int update(TeamInfoDto info);

	int delete(String teamID);

	// 팀찾기 페이지 간단 정보
	public List<TeamInfoSimpleDto> selectAll();

	// 나의 팀 정보
	public List<MyTeamDto> selectAllmyteam(String id);

	int insertmy(UserTeamConnDto uteam);

}
