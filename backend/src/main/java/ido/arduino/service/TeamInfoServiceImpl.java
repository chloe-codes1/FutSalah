package ido.arduino.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ido.arduino.dao.TeamMapper;
import ido.arduino.dto.LocationDto;
import ido.arduino.dto.MyTeamDto;
import ido.arduino.dto.TeamInfoDto;
import ido.arduino.dto.TeamInfoSimpleDto;
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
		// TODO Auto-generated method stub
		return tRepo.insert(info);
	}

	@Override
	public int update(TeamInfoDto info) {
		// TODO Auto-generated method stub
		return tRepo.update(info);
	}

	@Override
	public int delete(String teamID) {
		// TODO Auto-generated method stub
		return tRepo.delete(teamID);
	}

	@Override
	public List<TeamInfoSimpleDto> selectAll() {
		// TODO Auto-generated method stub
		return tRepo.selectAll();
	}

	@Override
	public List<MyTeamDto> selectAllmyteam() {
		// TODO Auto-generated method stub
		return tRepo.selectAllmyteam();
	}

	@Override
	public List<LocationDto> selectSido() throws Exception {
		// TODO Auto-generated method stub
		return tRepo.selectSido();
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

}
