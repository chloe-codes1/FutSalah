package ido.arduino.service;

import java.util.List;

import ido.arduino.dto.TeamInfoDto;

public interface TeamInfoService {

	int insert(TeamInfoDto info);
	
	int update(TeamInfoDto info);
	
	int delete(String teamID);

	List<TeamInfoDto> selectAll();


}
