package ido.arduino.repo;

import org.springframework.beans.factory.annotation.Autowired;

import ido.arduino.dto.TeamDTO;

public class TeamInfoRepoImpl implements TeamInfoRepo{

	
	@Autowired
	
	@Override
	public int insert(TeamDTO info) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int update(TeamDTO info) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int delete(String teamID) {
		// TODO Auto-generated method stub
		return 0;
	}
	
}
