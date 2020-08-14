package ido.arduino.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchRegisterDto;
import ido.arduino.dto.MatchRequestDto;
import ido.arduino.dto.MatchRequestSimpleDto;

public interface MatchGameService {
	
	List<MatchDto> alloption(MatchRequestDto matchrequest);
	List<MatchDto> simpleoption(MatchRequestSimpleDto matchrequest);
	int insertmatch(MatchDto match);
	int registerForGame(int matchID, int teamID);
	int checkIfRegistered(int matchID, int teamID);
	List<MatchDto> comematch(int userID);
	int deletematch(int matchID);

}
