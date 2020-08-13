package ido.arduino.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchRegisterDto;
import ido.arduino.dto.MatchRequestDto;
import ido.arduino.dto.MatchRequestSimpleDto;
import ido.arduino.repo.MatchGameRepo;

@Service
public class MatchGameServiceImpl implements MatchGameService{

	
	@Autowired
	MatchGameRepo mRepo;
	
	//----------전체 조건 만족하는 리스트 출력---------------
	@Override
	public List<MatchDto> alloption(MatchRequestDto matchrequest) {
		// TODO Auto-generated method stub
		return mRepo.alloption(matchrequest);
	}

	//----------일부 조건 만족하는 리스트 출력---------------
	@Override
	public List<MatchDto> simpleoption(MatchRequestSimpleDto matchrequest) {
		// TODO Auto-generated method stub
		return mRepo.simpleoption(matchrequest);
	}
	
	//----------전체 조건 만족하는 리스트 없을 경우 등록---------------

	@Override
	public int insertmatch(MatchDto match) {
		// TODO Auto-generated method stub
		return mRepo.insertmatch(match);
	}

	//----------나에게 요청온 매칭 리스트 (내팀이 등록한 매칭 정보)---------------
	@Override
	public List<MatchRegisterDto> comematch() {
		// TODO Auto-generated method stub
		return mRepo.comematch();
	}

}
