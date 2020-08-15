package ido.arduino.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ido.arduino.dao.RankingMapper;
import ido.arduino.dto.TeamInfoDto;

@Service
public class RankingServiceImpl implements RankingService{

	@Autowired
	RankingMapper rankingMapper;
	
	@Override
	public List<TeamInfoDto> getBestTeams() {
		return rankingMapper.getBestTeams();
	}

	@Override
	public List<TeamInfoDto> getBestTeamsEachLocations(int locationID) {
		return rankingMapper.getBestTeamsEachLocations(locationID);
	}

}
