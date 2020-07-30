package ido.arduino.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ido.arduino.dto.TeamInfoDto;
import ido.arduino.repo.TeamInfoRepo;


@Service
public class TeamInfoServiceImpl implements TeamInfoService {

	
	@Autowired
	TeamInfoRepo tRepo;
	
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
	public List<TeamInfoDto> selectAll() {
		// TODO Auto-generated method stub
		return null;
	}

	

}
