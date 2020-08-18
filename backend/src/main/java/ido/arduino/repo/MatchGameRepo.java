package ido.arduino.repo;

import java.util.List;

import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchRegisterDto;
import ido.arduino.dto.MatchRequestDto;
import ido.arduino.dto.MatchRequestSimpleDto;
import ido.arduino.dto.WaitMatchDto;

public interface MatchGameRepo {
	
	
	public List<MatchDto> alloption(MatchDto matchrequest);
	public List<MatchDto> simpleoption(MatchDto matchrequest);
	int insertmatch(MatchDto match);
	
	// 내가 등록한 요청 
	public List<MatchDto> comematch(int userID);
	int deletematch(int matchID);
	int deletewaitmatch(int matchID);
	// 내가 등록한 매칭에 대한 요청
	public List<WaitMatchDto> waitmatch(int matchID);
	
	
	// 요청한 매칭 삭제 
	public List<MatchDto> requestmatch(int userID);
	int requestdelete(WaitMatchDto wait);

	// 예정된 경기 일정
	public List<MatchDto> schedule(int userID);
	
	
	
}
