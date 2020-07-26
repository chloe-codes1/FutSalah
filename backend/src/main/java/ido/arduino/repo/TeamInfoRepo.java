package ido.arduino.repo;

import java.util.List;

import ido.arduino.dto.TeamInfoDto;

public interface TeamInfoRepo {
	
	int insert(TeamInfoDto info);
	int update(TeamInfoDto info);	
	int delete(String teamID);
	
	public List<TeamInfoDto> selectAll();

}
