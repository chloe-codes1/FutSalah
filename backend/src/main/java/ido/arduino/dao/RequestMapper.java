package ido.arduino.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ido.arduino.dto.RequestDTO;

@Mapper
public interface RequestMapper {
	List<RequestDTO> getAllRequests(int teamID);
	RequestDTO getRequest(int teamID, int userID);
	int insert(int userID, int teamID);
	int delete(int resultID);
	int checkIfRequested(int userID, int teamID);
}
