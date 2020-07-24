package ido.arduino.service;

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

}
