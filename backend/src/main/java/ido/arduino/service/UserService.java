package ido.arduino.service;

import ido.arduino.dto.UserDTO;

public interface UserService {
	UserDTO findByID(int id);
	int insert (UserDTO user);
	int update(UserDTO user);
	int delete(int id);
}
