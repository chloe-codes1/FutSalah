package ido.arduino.service;

import java.util.List;

import ido.arduino.dto.CourtDTO;
import ido.arduino.dto.Matching2DTO;

public interface Matching2Service {
	List<Matching2DTO> searchScheduledMatch(int stadium);
	List<CourtDTO> searchCourtByLocation(int location);
}
