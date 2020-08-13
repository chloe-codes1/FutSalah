package ido.arduino.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ido.arduino.dao.TeamMapper;
import ido.arduino.dto.DeleteFormationDto;
import ido.arduino.dto.Formation;

import ido.arduino.dto.MyTeamDto;
import ido.arduino.dto.ResultDto;
import ido.arduino.dto.TeamInfoDto;
import ido.arduino.dto.TeamInfoSimpleDto;
import ido.arduino.dto.TeamLeaderDTO;
import ido.arduino.dto.TeamLocationDTO;
import ido.arduino.dto.UserTeamConnDto;
import ido.arduino.dto.UserDTO;
import ido.arduino.repo.TeamInfoRepo;

@Service
public class TeamInfoServiceImpl implements TeamInfoService {

	@Autowired
	TeamInfoRepo tRepo;

	@Autowired
	TeamMapper teamMapper;

	// ----------------create team---------------------------
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
	public int checkIfExists(String name) {
		return teamMapper.checkIfExists(name);
	}

	@Override
	public int update(TeamInfoDto info) {
		return tRepo.update(info);
	}

	@Override
	public int delete(int teamID) {
		return tRepo.delete(teamID);
	}

	// ----------------myteam---------------------------
	@Override
	public List<MyTeamDto> selectAllmyteam(int id) {
		return tRepo.selectAllmyteam(id);
	}

	@Override
	public int updatemy(UserDTO userID) {
		// TODO Auto-generated method stub
		return tRepo.updatemy(userID);
	}

	@Override
	public int insertmy(UserTeamConnDto uteam) {
		// TODO Auto-generated method stub
		return tRepo.insertmy(uteam);
	}
	
	@Override
	public int deletemyteam(UserTeamConnDto uteam) {
		// TODO Auto-generated method stub
		return tRepo.deletemyteam(uteam);
	}

	

	// ----------------find team---------------------------
	@Override
	public List<TeamInfoSimpleDto> selectAll() {
		return tRepo.selectAll();
	}

	// ----------------team info---------------------------
	@Override
	public List<UserDTO> getAllCrewInfo(int teamID) {
		return teamMapper.getAllCrewInfo(teamID);
	}

	@Override
	public TeamLeaderDTO getTeamLeaderInfo(int teamID) {
		return teamMapper.getTeamLeaderInfo(teamID);
	}

	@Override
	public List<TeamLocationDTO> searchTeamByName(String name) {
		return teamMapper.searchTeamByName(name);
	}

	@Override
	public List<TeamLocationDTO> searchTeamByLocation(String gu) {
		return teamMapper.searchTeamByLocation(gu);
	}

	@Override
	public List<TeamLocationDTO> searchTeamByBoth(String name, String gu) {
		return teamMapper.searchTeamByBoth(name, gu);
	}

	@Override
	public int getNextTeamId() {
		return teamMapper.getNextTeamId();
	}

	@Override
	public TeamInfoDto getTeamInfo(int teamID) {
		return teamMapper.getTeamInfo(teamID);
	}

	@Override
	public int deleteCrew(int teamID, int userID) {
<<<<<<< HEAD
		int result = teamMapper.deleteformation2(teamID, userID);
		System.out.println(result);
		int result2 = teamMapper.deleteCrew(teamID, userID);
		if (result == 1 && result2 == 1) {
			return 1;
		} else {
			throw new RuntimeException();
		}

=======
		

		int result = teamMapper.deleteformation2(teamID, userID);
		int result2 =teamMapper.deleteCrew(teamID, userID);
		if(result==1 &&result2==1) {
			return 1;
		}
		else {
			throw new RuntimeException();
		}
		
>>>>>>> 92873766381178c79bdb8b8745f38e8cbf4fcc70
	}

	@Override
	public int getNumberOfCrews(int teamID) {
		return teamMapper.getNumberOfCrews(teamID);
	}

	@Override
	public int getNextLeader(int userID, int teamID) {
		return teamMapper.getNextLeader(userID, teamID);
	}

	@Override
	public int updateLeader(int userID, int teamID) {
		return teamMapper.updateLeader(userID, teamID);
	}

	// ----------------formation---------------------------

	@Override
	public int insertformation(Formation form) {
		return tRepo.insertformation(form);
	}

	@Override
	public int updateformation(Formation form) {
		return tRepo.updateformation(form);
	}

	@Override
	public int deleteformation(DeleteFormationDto form) {
		return tRepo.deleteformation(form);
	}

	@Override
	public List<Formation> selectformation(int teamID) {
		return tRepo.selectformation(teamID);

	}

	// ----------------result game---------------------------

	@Override
	public List<ResultDto> resultscore(int teamID) {
		// TODO Auto-generated method stub
		return tRepo.resultscore(teamID);
	}

}
