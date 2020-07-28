package ido.arduino.service;

import java.util.List;

import ido.arduino.dto.UserDTO;

public interface UserService {
	UserDTO findBySocialID(String socialID);
	int insert (UserDTO user);
	int update(UserDTO user);
	int delete(int userID);
	List<UserDTO> searchUsersByName(String name);
}
