package ido.arduino.dao;

import org.apache.ibatis.annotations.Mapper;

import ido.arduino.dto.MatchDto;

@Mapper
public interface MatchMapper {
	int registerForGame(int matchID, int teamID);
	int checkIfRegistered(int matchID, int teamID);
	MatchDto getMatchInfo(int matchID);
}
