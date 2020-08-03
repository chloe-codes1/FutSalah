package ido.arduino.repo;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ido.arduino.dto.LocationDto;
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
		return template.insert(ns + "insert", info);
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
		return template.selectList(ns + "selectAll");
	}

	@Override
	public List<MyTeamDto> selectAllmyteam(String id) {
		// TODO Auto-generated method stub
		return template.selectList(ns + "selectAllmyteam",id);
	}

	@Override
	public int insertmy(UserTeamConnDto uteam) {
		// TODO Auto-generated method stub
		return template.insert(ns+"insertmy",uteam);
	}
	public List<MyTeamDto> selectAllmyteam() {
		return template.selectList(ns + "selectAllmyteam");
	}

	@Override
	public List<LocationDto> selectSido() throws Exception {
		return template.selectList(ns + "selectsido");
	}

	

}
