package ido.arduino.repo;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ido.arduino.dto.TeamInfoDto;

@Repository
public class TeamInfoRepoImpl implements TeamInfoRepo {

	private static String ns = "ido.arduino.mapper.TeamInfoDto.";

	@Autowired
	SqlSessionTemplate template;

	@Override
	public int insert(TeamInfoDto info) {
		// TODO Auto-generated method stub
		return template.insert(ns + "insert", info);
	}

	@Override
	public int update(TeamInfoDto info) {
		// TODO Auto-generated method stub
		return template.update(ns + "update", info);
	}

	@Override
	public int delete(String teamID) {
		// TODO Auto-generated method stub
		return template.delete(ns + "delete", teamID);
	}

	@Override
	public List<TeamInfoDto> selectAll() {
		// TODO Auto-generated method stub
		return template.selectList(ns + "selectAll");
	}

}
