package ido.arduino.repo;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ido.arduino.dto.Matching2DTO;

@Repository
public class Matching2RepoImpl implements Matching2Repo {
	private static String ns = "ido.arduino.mapper.Matching2DTO.";
	
	@Autowired
	SqlSessionTemplate template;
	
	@Override
	public List<Matching2DTO> searchScheduledMatch(int stadium) {
		return template.selectList(ns + "searchScheduledMatch");
	}
}
