package ido.arduino.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ido.arduino.dao.RequestMapper;
import ido.arduino.dto.RequestDTO;

@Service
public class RequestServiceImpl implements RequestService {
	
	@Autowired
	private RequestMapper requestMapper;
	
	@Override
	public List<RequestDTO> getAllRequests(int teamID) {
		return requestMapper.getAllRequests(teamID);
	}
	
	@Override
	public RequestDTO getRequest(int teamID, int userID) {
		return requestMapper.getRequest(teamID, userID);
	}

	@Override
	public int insert(int userID, int teamID) {
		return requestMapper.insert(userID, teamID);
	}

	@Override
	public int delete(int resultID) {
		return requestMapper.delete(resultID);
	}

}
