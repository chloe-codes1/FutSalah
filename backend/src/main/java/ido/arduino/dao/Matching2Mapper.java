package ido.arduino.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ido.arduino.dto.Matching2DTO;

@Mapper
public interface Matching2Mapper {
	List<Matching2DTO> searchScheduledMatch(int stadium);
}
