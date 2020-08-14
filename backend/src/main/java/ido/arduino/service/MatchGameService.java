package ido.arduino.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchRegisterDto;
import ido.arduino.dto.MatchRequestDto;
import ido.arduino.dto.MatchRequestSimpleDto;
import ido.arduino.dto.WaitMatchDto;

public interface MatchGameService {
	
	// 조건에 맞는 매칭 찾기
	List<MatchDto> alloption(MatchDto matchrequest);
	List<MatchDto> simpleoption(MatchDto matchrequest);
	
	// 매칭신청
	int insertmatch(MatchDto match);
	int registerForGame(int matchID, int teamID);
	
	// 매칭 수락 및 거절
	int checkIfRegistered(int matchID, int teamID);
	int deletematch(int matchID);
	
	// 나에게 온 매칭 요청 
	List<MatchDto> comematch(int userID);
	
	MatchDto getMatchInfo(int matchID);
	
	// 매칭 삭제 
	int deleteAllWaitings(int matchID);
	
	// 매칭 요청 수락 및 거절 
	int acceptMatchRequest(int teamID, int matchID);
	int refuseMatchRequest(int matchID, int teamID);
	
	
	// 내가 요청한 매칭 
	List<MatchDto> requestmatch(int userID);
	int requestdelete(WaitMatchDto wait);
}
