package ido.arduino.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ido.arduino.dao.MatchMapper;
import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchInfoDTO;
import ido.arduino.dto.TeamLeaderDTO;
import ido.arduino.dto.WaitMatchDto;
import ido.arduino.repo.MatchGameRepo;

@Service
public class MatchGameServiceImpl implements MatchGameService {

	@Autowired
	MatchGameRepo mRepo;

	@Autowired
	MatchMapper matchMapper;

	// ----------전체 조건 만족하는 리스트 출력---------------
	@Override
	public List<MatchDto> alloption(MatchDto matchrequest) {
		return mRepo.alloption(matchrequest);
	}

	// ----------일부 조건 만족하는 리스트 출력---------------
	@Override
	public List<MatchDto> simpleoption(MatchDto matchrequest) {
		return mRepo.simpleoption(matchrequest);
	}

	// ----------전체 조건 만족하는 리스트 없을 경우 등록---------------

	@Override
	public int insertmatch(MatchDto match) {
		return mRepo.insertmatch(match);
	}

	@Override
	public int registerForGame(int matchID, int teamID) {
		return matchMapper.registerForGame(matchID, teamID);
	}

	@Override
	public int checkIfRegistered(int matchID, int teamID) {
		return matchMapper.checkIfRegistered(matchID, teamID);

	}

	// ----------나에게 요청온 매칭 리스트 (내팀이 등록한 매칭 정보)---------------
	@Override
	public List<MatchDto> comematch(int userID) {
		return mRepo.comematch(userID);
	}

	@Override
	public int deletematch(int matchID) {
		return mRepo.deletematch(matchID);
	}

	@Override
	public int deleteWaiting(int matchID) {
		return mRepo.deletewaitmatch(matchID);
	}

	@Override
	public MatchDto getMatchInfo(int matchID) {
		return matchMapper.getMatchInfo(matchID);
	}

	@Override
	public int deleteAllWaitings(int matchID) {
		return matchMapper.deleteAllWaitings(matchID);
	}

	@Override
	public int acceptMatchRequest(int teamID, int matchID) {
		return matchMapper.acceptMatchRequest(teamID, matchID);
	}

	@Override
	public int refuseMatchRequest(int matchID, int teamID) {
		return matchMapper.refuseMatchRequest(matchID, teamID);
	}

	// 내가 등록한 매칭에 대한 상대팀 리스트
	@Override
	public List<WaitMatchDto> waitmatch(int matchID) {
		return mRepo.waitmatch(matchID);
	}

	// ----------내가 요청한 매칭 리스트 (내팀이 요청한 매칭 정보) & 요청 삭제 ---------------
	@Override
	public List<MatchDto> requestmatch(int userID) {
		return mRepo.requestmatch(userID);
	}

	@Override
	public int requestdelete(WaitMatchDto wait) {
		return mRepo.requestdelete(wait);
	}

	// ----------내가 속한 팀의 예정된 경기 일정 ---------------
	@Override
	public List<MatchDto> schedule(int userID) {
		return mRepo.schedule(userID);
	}

	@Override
	public List<TeamLeaderDTO> getAllWaitingTeamsInfo(int matchID) {
		return matchMapper.getAllWaitingTeamsInfo(matchID);
	}

	@Override
	public MatchInfoDTO getSimpleMatchInfo(int matchID) {
		return matchMapper.getSimpleMatchInfo(matchID);
	}

	@Override
	public int checkIfWaitingExists(int matchID) {
		return matchMapper.checkIfWaitingExists(matchID);
	}

}
