package ido.arduino.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ido.arduino.dto.CourtDTO;
import ido.arduino.dto.Matching2DTO;
import ido.arduino.service.Matching2Service;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class Matching2Controller {
	private static final Logger logger = LoggerFactory.getLogger(Matching2Controller.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private Matching2Service mService;
	
	@ApiOperation(value = "해당 구장에 오늘 예정된 경기를 반환한다.", response = List.class)
	@GetMapping("/match/fsearch/{stadium}")
	public @ResponseBody List<Matching2DTO> searchScheduledMatch(@PathVariable int stadium) throws Exception {
		
		logger.debug("searchScheduledMatch - 호출");
		List<Matching2DTO> list = mService.searchScheduledMatch(stadium);
		
		return list;
	}
	
	// 로케이션아이디 받아서 해당하는 구장 정보 반환(id, name)
	@ApiOperation(value = "로케이션 id 받아서 해당하는 구장 정보를 반환한다.", response = List.class)
	@GetMapping("/match/stadium/{location}")
	public @ResponseBody List<CourtDTO> searchCourtByLocation(@PathVariable int location) {
		List<CourtDTO> list = mService.searchCourtByLocation(location);
		
		return list;
	}
}
