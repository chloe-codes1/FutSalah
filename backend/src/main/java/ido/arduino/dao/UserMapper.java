package ido.arduino.dao;

import org.apache.ibatis.annotations.Mapper;

import ido.arduino.dto.UserDTO;

@Mapper
public interface UserMapper {
	int insert(UserDTO user);
	int update(UserDTO user);
	int delete(int userID);
	UserDTO findBySocialID(String socialID);
}
