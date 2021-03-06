package ido.arduino.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ido.arduino.dao.CourtMapper;
import ido.arduino.dto.CourtAdminDTO;
import ido.arduino.dto.CourtDTO;
import ido.arduino.dto.ResultDto;

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

	@Override
	public CourtDTO getCourtInfo(int courtID) {
		return courtMapper.getCourtInfo(courtID);
	}
	
	@Override
	public void reliability(String name, int much) {
		courtMapper.reliability(name, much);
	}
	
	@Override
	public void modifyRecord(String name, String result) {
		if (result.equals("wins")) {
			courtMapper.modifyWinRecord(name);
		} else if (result.equals("draws")) {
			courtMapper.modifyDrawRecord(name);
		} else {
			courtMapper.modifyDefeatRecord(name);
		}
	}
	
	@Override
	public void modifyPoints(String name) {
		courtMapper.modifyPoints(name);
	}
	
	@Override
	public void insertResult(ResultDto data) {
		courtMapper.insertResult(data);
	}
}
