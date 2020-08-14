package ido.arduino.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ido.arduino.dao.CourtMapper;
import ido.arduino.dto.CourtAdminDTO;

@Service
public class CourtServiceImpl implements CourtService {
	
	@Autowired
	CourtMapper courtMapper;

	@Override
	public int checkValid(String id, String password) {
		if (password.equals(courtMapper.checkValid(id))) {
			return 1;
		}
		else
			return 0;
	}
	
	@Override
	public CourtAdminDTO login(String id) {
		return courtMapper.login(id);
	}
}
