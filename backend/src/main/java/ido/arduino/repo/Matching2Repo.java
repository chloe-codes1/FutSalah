package ido.arduino.repo;

import java.util.List;

import ido.arduino.dto.Matching2DTO;

public interface Matching2Repo {
	List<Matching2DTO> searchScheduledMatch(int stadium);
}
