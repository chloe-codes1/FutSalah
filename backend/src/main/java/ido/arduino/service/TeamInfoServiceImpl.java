package ido.arduino.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ido.arduino.dao.TeamMapper;
import ido.arduino.dto.MyTeamDto;
import ido.arduino.dto.TeamInfoDto;
import ido.arduino.dto.TeamInfoSimpleDto;
import ido.arduino.dto.UserTeamConnDto;
import ido.arduino.dto.UserDTO;
import ido.arduino.repo.TeamInfoRepo;

@Service
public class TeamInfoServiceImpl implements TeamInfoService {

	@Autowired
	TeamInfoRepo tRepo;
	
	@Autowired
	TeamMapper teamMapper;

	@Override
	public int insert(TeamInfoDto info) {
		int result = tRepo.insert(info);
		if (result == 1) {
			return tRepo.selectlast();
		} else {
			throw new RuntimeException();
		}
	}

	@Override
	public int update(TeamInfoDto info) {
		return tRepo.update(info);
	}

	@Override
	public int delete(String teamID) {
		return tRepo.delete(teamID);
	}

	@Override
	public List<TeamInfoSimpleDto> selectAll() {
		return tRepo.selectAll();
	}

	@Override
	public List<MyTeamDto> selectAllmyteam(String id) {
		return tRepo.selectAllmyteam(id);
	}

	@Override
	public TeamInfoDto getTeamInfo(int teamID) {
		return teamMapper.getTeamInfo(teamID);
	}

	@Override
	public int checkIfExists(String name) {
		return teamMapper.checkIfExists(name);
	}

	@Override
	public List<UserDTO> getAllCrewInfo(int teamID) {
		return teamMapper.getAllCrewInfo(teamID);
	}

	@Override
	public List<TeamInfoDto> searchTeamByName(String name) {
		return teamMapper.searchTeamByName(name);
	}
	
	@Override
	public int getNextTeamId() {
		return teamMapper.getNextTeamId();
	}

	@Override
	public int updatemy(UserDTO userID) {
		return tRepo.updatemy(userID);
	}

	@Override
	public int insertmy(UserTeamConnDto uteam) {
		return tRepo.insertmy(uteam);
	}

}
