package ido.arduino.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchSimpleDto;
import ido.arduino.repo.MatchGameRepo;

public interface MatchGameService {
	
	

	
	List<MatchDto> alloption();
	List<MatchDto> simpleoption();
	int insertmatch(MatchDto match);
}
