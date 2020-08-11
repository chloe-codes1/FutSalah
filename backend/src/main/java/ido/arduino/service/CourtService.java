package ido.arduino.service;

import ido.arduino.dto.CourtAdminDTO;

public interface CourtService {
	public int checkValid(String id, String password);
	public CourtAdminDTO login(String id);
}
