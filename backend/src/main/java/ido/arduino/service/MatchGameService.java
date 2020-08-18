package ido.arduino.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchInfoDTO;
import ido.arduino.dto.MatchRegisterDto;
import ido.arduino.dto.MatchRequestDto;
import ido.arduino.dto.MatchRequestSimpleDto;
import ido.arduino.dto.TeamLeaderDTO;
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
	
	//내가 등록한 매칭 삭제 
	int deletematch(int matchID);
	
	// 웨이팅 걸려있는 리스트 삭제 
	int deleteWaiting(int matchID);
	
	// 내가 등록한 매칭 리스트 
	List<MatchDto> comematch(int userID);
	
	// 내가 등록한 매칭에 대한 요청 리스트
	public List<WaitMatchDto> waitmatch(int matchID);
	
	
	MatchDto getMatchInfo(int matchID);
	
	// 매치에 대기 신청한 팀들 정보 including leader info
	List<TeamLeaderDTO> getAllWaitingTeamsInfo(int matchID);
	
	// 간단 매치 정보 가져오기
	MatchInfoDTO getSimpleMatchInfo (int matchID);
	
	// 매칭 삭제 
	int deleteAllWaitings(int matchID);
	
	// 매칭 요청 수락 및 거절 
	int acceptMatchRequest(int teamID, int matchID);
	int refuseMatchRequest(int matchID, int teamID);
	
	
	// 내가 요청한 매칭 
	List<MatchDto> requestmatch(int userID);
	int requestdelete(WaitMatchDto wait);
	
	// 내가 속한 팀의 예정된 경기리스트 
	List<MatchDto> schedule(int userID);
	
	// 매칭 신청 팀 수 확인
	int checkIfWaitingExists(int matchID);
}
