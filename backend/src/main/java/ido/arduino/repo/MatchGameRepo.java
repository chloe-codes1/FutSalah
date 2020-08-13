package ido.arduino.repo;

import java.util.List;

import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchSimpleDto;

public interface MatchGameRepo {
	
	
	public List<MatchDto> alloption();
	public List<MatchDto> simpleoption();
	int insertmatch(MatchDto match);


}
