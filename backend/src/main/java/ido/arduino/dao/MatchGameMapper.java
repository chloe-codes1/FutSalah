package ido.arduino.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MatchGameMapper {
	int registerForGame(int matchID, int teamID);
	int checkIfRegistered(int matchID, int teamID);
}
