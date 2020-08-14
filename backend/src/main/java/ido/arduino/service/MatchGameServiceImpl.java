package ido.arduino.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ido.arduino.dao.MatchGameMapper;
import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchRequestDto;
import ido.arduino.dto.MatchRequestSimpleDto;
import ido.arduino.repo.MatchGameRepo;

@Service
public class MatchGameServiceImpl implements MatchGameService{

	
	@Autowired
	MatchGameRepo mRepo;
	
	@Autowired
	MatchGameMapper matchMapper;
	
	@Override
	public List<MatchDto> alloption(MatchRequestDto matchrequest) {
		return mRepo.alloption(matchrequest);
	}

	@Override
	public List<MatchDto> simpleoption(MatchRequestSimpleDto matchrequest) {
		return mRepo.simpleoption(matchrequest);
	}

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

}
