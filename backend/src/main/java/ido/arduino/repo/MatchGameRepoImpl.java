package ido.arduino.repo;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchRegisterDto;
import ido.arduino.dto.MatchRequestDto;
import ido.arduino.dto.MatchRequestSimpleDto;


@Repository
public class MatchGameRepoImpl implements MatchGameRepo{
	
	private static String ns = "ido.arduino.mapper.MatchGameMapper.";

	@Autowired
	SqlSessionTemplate template;

	//----------전체 조건 만족하는 리스트 출력---------------
	@Override
	public List<MatchDto> alloption(MatchRequestDto matchrequest) {
		// TODO Auto-generated method stub
		return template.selectList(ns+"alloption",matchrequest);
	}

	//----------일부 조건 만족하는 리스트 출력---------------
	@Override
	public List<MatchDto> simpleoption(MatchRequestSimpleDto matchrequest) {
		// TODO Auto-generated method stub
		return template.selectList(ns+"simpleoption", matchrequest);
	}
	
	//----------전체 조건 만족하는 리스트 없을 경우 등록---------------
	@Override
	public int insertmatch(MatchDto match) {
		// TODO Auto-generated method stub
		return template.insert(ns+"insertmatch", match);
	}

	//----------나에게 요청온 매칭 리스트 (내팀이 등록한 매칭 정보)---------------
	@Override
	public List<MatchDto> comematch(int userID) {
		// TODO Auto-generated method stub
		return template.selectList(ns+"comematch",userID);
	}

	@Override
	public int deletematch(int matchID) {
		// TODO Auto-generated method stub
		return template.delete(ns+"deletematch",matchID);
	}
	
	
	

}
