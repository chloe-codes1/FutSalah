package ido.arduino.service;

import ido.arduino.dto.CourtAdminDTO;
import ido.arduino.dto.CourtDTO;

public interface CourtService {
	public int checkValid(String id, String password);
	public CourtAdminDTO login(String id);
	CourtDTO getCourtInfo(int courtID);
}
