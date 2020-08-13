package ido.arduino.repo;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchSimpleDto;


@Repository
public class MatchGameRepoImpl implements MatchGameRepo{
	
	private static String ns = "ido.arduino.mapper.MatchDto.";

	@Autowired
	SqlSessionTemplate template;

	@Override
	public List<MatchDto> alloption() {
		// TODO Auto-generated method stub
		return template.selectList(ns+"alloption");
	}

	@Override
	public List<MatchDto> simpleoption() {
		// TODO Auto-generated method stub
		return template.selectList(ns+"simpleoption");
	}
	
	@Override
	public int insertmatch(MatchDto match) {
		// TODO Auto-generated method stub
		return template.insert(ns+"insertmatch", match);
	}


}
