package ido.arduino.service;

import java.util.List;

import ido.arduino.dto.TeamInfoDto;

public interface RankingService {
	List<TeamInfoDto> getBestTeams();
	List<TeamInfoDto> getBestTeamsEachLocations(int locationID);
}
