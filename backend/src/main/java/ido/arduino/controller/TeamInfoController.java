package ido.arduino.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ido.arduino.dto.MyTeamDto;
import ido.arduino.dto.TeamInfoDto;
import ido.arduino.dto.TeamInfoSimpleDto;
import ido.arduino.dto.UserTeamConnDto;
import ido.arduino.dto.UserDTO;
import ido.arduino.service.TeamInfoService;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class TeamInfoController {
	private static final Logger logger = LoggerFactory.getLogger(TeamInfoController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	TeamInfoService tService;

	@ApiOperation(value = "모든 팀 정보를 반환한다.", response = List.class)
	@GetMapping("/team")
	public ResponseEntity<List<TeamInfoSimpleDto>> selectAll() throws Exception {
		logger.debug("selectAll - 호출");
		System.out.println("CaaaORS Filtering on...........................................................");

		return new ResponseEntity<List<TeamInfoSimpleDto>>(tService.selectAll(), HttpStatus.OK);
	}
	
	// 팀 정보 조회 by teamID
	@ApiOperation(value = "팀 leader를 포함한 팀 정보를 반환한다.", response = String.class)
	@GetMapping("/team/{teamID}")
	public @ResponseBody TeamInfoDto getTeamInfo(@PathVariable int teamID) {
		TeamInfoDto currentTeam = tService.getTeamInfo(teamID);
		return currentTeam;
	}
	
	// 팀원 정보 조회 by teamID
	@GetMapping("/team/member/{teamID}")
	public @ResponseBody List<UserDTO> getAllCrewInfo(@PathVariable int teamID){
		List<UserDTO> list = tService.getAllCrewInfo(teamID);
		return list;
	}
	
	// 팀 이름 중복검사
	@GetMapping("/team/check/{name}")
	public @ResponseBody int checkIfExists(@PathVariable String name) {
		return tService.checkIfExists(name);
	}
	
	// 나의 팀 목록에서 확인하기
	@ApiOperation(value = "내가 속한 모든 팀 정보를 반환한다. ", response = List.class)
	@PostMapping("/team/my")
	public ResponseEntity<List<MyTeamDto>> selectAllmyteam
	(@RequestBody Map<String, String> param) throws Exception {
		
		 String id  = param.get("socialID");
		logger.debug("selectAllmyteam - 호출");
		System.out.println("check.............................");
		
		return new ResponseEntity<List<MyTeamDto>>(tService.selectAllmyteam(id), HttpStatus.OK);
	}


	// 팀 생성하기
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


		
	// 팀정보 수정하기
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

	// 팀 정보 삭제
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
	
	// 팀 검색 by name
	@GetMapping("/team/search/{name}")
	public @ResponseBody List<TeamInfoDto> searchTeamByName (@PathVariable String name){
		List<TeamInfoDto> list = tService.searchTeamByName(name);
		return list;
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
