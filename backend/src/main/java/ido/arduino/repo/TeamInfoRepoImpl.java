package ido.arduino.repo;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ido.arduino.dto.MyTeamDto;
import ido.arduino.dto.TeamInfoDto;
import ido.arduino.dto.TeamInfoSimpleDto;
import ido.arduino.dto.UserDTO;
import ido.arduino.dto.UserTeamConnDto;

@Repository
public class TeamInfoRepoImpl implements TeamInfoRepo {
	private static String ns = "ido.arduino.mapper.TeamInfoDto.";

	@Autowired
	SqlSessionTemplate template;

	@Override
	public int insert(TeamInfoDto info) {
		// 팀 정보 삽입
		return template.insert(ns + "insert", info);
	}

	@Override
	public List<MyTeamDto> selectAllmyteam(String id) {
		//나의 팀 목록 받아오기 
		return template.selectList(ns + "selectAllmyteam",id);
	}
	
	@Override
	public int update(TeamInfoDto info) {
		return template.update(ns + "update", info);
	}

	@Override
	public int delete(String teamID) {
		return template.delete(ns + "delete", teamID);
	}

	@Override
	public List<TeamInfoSimpleDto> selectAll() {
		// 모든 팀 목록 
		return template.selectList(ns + "selectAll");
	}

	@Override
	public int insertmy(UserTeamConnDto uteam) {
		return template.insert(ns+"insertmy",uteam);
	}

	@Override
	public int updatemy(UserDTO userID) {
		return template.update(ns+"updatemy", userID);
	}

	@Override
	public int selectlast() {
		return template.selectOne(ns  +"selectlast");
	}
}
