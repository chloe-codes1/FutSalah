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
	
	public List<MatchDto> comematch(int userID);
	int deletematch(int matchID);
	
	public List<MatchDto> requestmatch(int userID);
	int requestdelete(WaitMatchDto wait);

	public List<MatchDto> schedule(int userID);
}
