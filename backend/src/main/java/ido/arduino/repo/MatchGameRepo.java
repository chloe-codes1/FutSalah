package ido.arduino.repo;

import java.util.List;

import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchRegisterDto;
import ido.arduino.dto.MatchRequestDto;
import ido.arduino.dto.MatchRequestSimpleDto;

public interface MatchGameRepo {
	
	
	public List<MatchDto> alloption(MatchRequestDto matchrequest);
	public List<MatchDto> simpleoption(MatchRequestSimpleDto matchrequest);
	int insertmatch(MatchDto match);
	public List<MatchRegisterDto> comematch();

}
