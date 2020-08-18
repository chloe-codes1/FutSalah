package ido.arduino.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchInfoDTO;
import ido.arduino.dto.TeamLeaderDTO;

@Mapper
public interface MatchMapper {
	int registerForGame(int matchID, int teamID);
	int checkIfRegistered(int matchID, int teamID);
	MatchDto getMatchInfo(int matchID);
	int deleteAllWaitings(int matchID);
	int acceptMatchRequest(int teamID, int matchID);
	int refuseMatchRequest(int matchID, int teamID);
	List<TeamLeaderDTO> getAllWaitingTeamsInfo(int matchID);
	MatchInfoDTO getSimpleMatchInfo (int matchID);
	int checkIfWaitingExists(int matchID);
}
