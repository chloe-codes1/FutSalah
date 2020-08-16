package ido.arduino.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ido.arduino.dto.TeamInfoDto;

@Mapper
public interface RankingMapper {
	List<TeamInfoDto> getBestTeams();
	List<TeamInfoDto> getBestTeamsEachLocations(int locationID);
}
