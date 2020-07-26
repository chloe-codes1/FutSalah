package ido.arduino.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ido.arduino.dto.TeamInfoDto;
import ido.arduino.service.TeamInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api")
@Api(value = "SSAFY")
public class TeamInfoController {
	private static final Logger logger = LoggerFactory.getLogger(TeamInfoController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	TeamInfoService tService;

	

	 @ApiOperation(value = "모든 팀 정보를 반환한다.", response = List.class)
	@GetMapping("/team")
		public ResponseEntity<List<TeamInfoDto>> selectAll() throws Exception {
			logger.debug("selectAll - 호출");
			return new ResponseEntity<List<TeamInfoDto>>(tService.selectAll(), HttpStatus.OK);
		}
	
	
	@ApiOperation(value = "새로운 팀 정보 등록.", response = String.class)
	@PostMapping("/team")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody TeamInfoDto teamInfo) {
		ResponseEntity<Map<String, Object>> entity = null;
		try {
			int result = tService.insert(teamInfo);
			entity = handleSuccess(teamInfo.getClass() + "가 추가되었습니다.");
		} catch (RuntimeException e) {
			entity = handleException(e);
		}
		return entity;
	}

	// 사용자 정보 수정

	@ApiOperation(value = "팀 정보 수정.", response = String.class)
	@PutMapping("/team/{teamID}")
	public ResponseEntity<Map<String, Object>> update(@RequestBody TeamInfoDto teamInfo) {
		ResponseEntity<Map<String, Object>> entity = null;
		try {
			int result = tService.update(teamInfo);
			entity = handleSuccess(teamInfo.getClass() + "가 수정되었습니다.");
		} catch (RuntimeException e) {
			entity = handleException(e);
		}
		return entity;
	}

	// 사용자 정보 삭제

	@ApiOperation(value = "팀 정보 삭제.", response = String.class)
	@DeleteMapping("/team/{teamID}")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable String teamID) {
		ResponseEntity<Map<String, Object>> entity = null;
		try {
			int result = tService.delete(teamID);
			entity = handleSuccess(teamID + "가 삭제되었습니다.");
		} catch (RuntimeException e) {
			entity = handleException(e);
		}
		return entity;
	}

	private ResponseEntity<Map<String, Object>> handleSuccess(Object data) {
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", true);
		resultMap.put("data", data);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	private ResponseEntity<Map<String, Object>> handleException(Exception e) {
		logger.error("예외 발생", e);
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", false);
		resultMap.put("data", e.getMessage());
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
