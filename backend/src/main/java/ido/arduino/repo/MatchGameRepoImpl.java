package ido.arduino.repo;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchRequestDto;
import ido.arduino.dto.MatchRequestSimpleDto;


@Repository
public class MatchGameRepoImpl implements MatchGameRepo{
	
	private static String ns = "ido.arduino.mapper.MatchRequestDto.";

	@Autowired
	SqlSessionTemplate template;

	@Override
	public List<MatchDto> alloption(MatchRequestDto matchrequest) {
		// TODO Auto-generated method stub
		return template.selectList(ns+"alloption",matchrequest);
	}

	@Override
	public List<MatchDto> simpleoption(MatchRequestSimpleDto matchrequest) {
		// TODO Auto-generated method stub
		return template.selectList(ns+"simpleoption", matchrequest);
	}
	
	@Override
	public int insertmatch(MatchDto match) {
		// TODO Auto-generated method stub
		return template.insert(ns+"insertmatch", match);
	}


}
