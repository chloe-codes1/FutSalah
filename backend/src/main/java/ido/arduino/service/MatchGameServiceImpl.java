package ido.arduino.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchRequestDto;
import ido.arduino.dto.MatchRequestSimpleDto;
import ido.arduino.repo.MatchGameRepo;

@Service
public class MatchGameServiceImpl implements MatchGameService{

	
	@Autowired
	MatchGameRepo mRepo;
	
	
	@Override
	public List<MatchDto> alloption(MatchRequestDto matchrequest) {
		// TODO Auto-generated method stub
		return mRepo.alloption(matchrequest);
	}

	@Override
	public List<MatchDto> simpleoption(MatchRequestSimpleDto matchrequest) {
		// TODO Auto-generated method stub
		return mRepo.simpleoption(matchrequest);
	}

	@Override
	public int insertmatch(MatchDto match) {
		// TODO Auto-generated method stub
		return mRepo.insertmatch(match);
	}

}
