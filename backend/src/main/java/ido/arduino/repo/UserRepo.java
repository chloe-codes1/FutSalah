package ido.arduino.repo;

import ido.arduino.dto.UserDTO;

public interface UserRepo {
	
	void insert(UserDTO user);
	void update(UserDTO user);
	void delete(int userID);
	UserDTO findByID(int userID);
	
}
