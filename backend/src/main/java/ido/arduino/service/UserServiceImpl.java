package ido.arduino.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ido.arduino.dao.UserMapper;
import ido.arduino.dto.UserDTO;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserMapper userMapper;
	
	@Override
	public UserDTO findBySocialID(String socialID) {
		return userMapper.findBySocialID(socialID);
	}

	@Override
	public UserDTO findByUserID(int userID) {
		return userMapper.findByUserID(userID);
	}
	
	@Override
	public int insert(UserDTO user) {
		return userMapper.insert(user);
	}

	@Override
	public int update(UserDTO user) {
		return userMapper.update(user);
	}

	@Override
	public int delete(int userID) {
		return userMapper.delete(userID);
	}

	@Override
	public List<UserDTO> searchUsersByName(String name) {
		return userMapper.searchUsersByName(name);
	}

	@Override
	public int checkIfEmailExists(String email) {
		return userMapper.checkIfEmailExists(email);
	}

}
