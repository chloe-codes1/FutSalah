package ido.arduino.service;

import java.util.List;

import ido.arduino.dto.RequestDTO;

public interface RequestService {
	List<RequestDTO> getAllRequests(int teamID);
	RequestDTO getRequest(int teamID, int userID);
	int insert(int userID, int teamID);
	int delete(int resultID);
	int checkIfRequested(int userID, int teamID);
}
