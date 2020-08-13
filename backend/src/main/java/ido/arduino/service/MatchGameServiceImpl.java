package ido.arduino.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchSimpleDto;
import ido.arduino.repo.MatchGameRepo;

@Service
public class MatchGameServiceImpl implements MatchGameService{

	
	@Autowired
	MatchGameRepo mRepo;
	
	
	@Override
	public List<MatchDto> alloption() {
		// TODO Auto-generated method stub
		return mRepo.alloption();
	}

	@Override
	public List<MatchDto> simpleoption() {
		// TODO Auto-generated method stub
		return mRepo.simpleoption();
	}

	@Override
	public int insertmatch(MatchDto match) {
		// TODO Auto-generated method stub
		return mRepo.insertmatch(match);
	}

}
