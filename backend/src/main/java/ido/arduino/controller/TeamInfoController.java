package ido.arduino.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

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

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageConfig;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import ido.arduino.dto.MyTeamDto;
import ido.arduino.dto.TeamInfoDto;
import ido.arduino.dto.TeamInfoSimpleDto;
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
	public @ResponseBody List<UserDTO> getAllCrewInfo(@PathVariable int teamID) {
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
	public ResponseEntity<List<MyTeamDto>> selectAllmyteam() throws Exception {
		logger.debug("selectAllmyteam - 호출");
		System.out.println("check.............................");
		return new ResponseEntity<List<MyTeamDto>>(tService.selectAllmyteam(), HttpStatus.OK);
	}

	// 나의 팀 목록에서 지우기 -> 팀나가기
	// @ApiOperation(value = "내가 속한 팀을삭제한다 ", response = List.class)
	// @PostMapping("/team/my")
	// public ResponseEntity<List<MyTeamDto>> selectAllmyteam () throws Exception {
	// logger.debug("selectAllmyteam - 호출");
	// System.out.println("check.............................");
	// return new ResponseEntity<List<MyTeamDto>>(tService.selectAllmyteam(),
	// HttpStatus.OK);
	// }

	// 팀 생성하기
	@ApiOperation(value = "새로운 팀 정보 등록.", response = String.class)
	@PostMapping("/team")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody TeamInfoDto teamInfo) {
		ResponseEntity<Map<String, Object>> entity = null;

		try {
			// TODO: 팀ID 가장 큰(가장 최근) 번호 가져와서 그 다음 번호로 QR내용 생성
			createQRCodeImage("TeamID", 350, 350, 0x00000000, 0xFFFFFFFF);
		} catch (WriterException e) {
			System.out.println("QR생성 실패");
		} catch (IOException e) {
			System.out.println("QR생성 실패");
		}

		
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
	public @ResponseBody List<TeamInfoDto> searchTeamByName(@PathVariable String name) {
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

	// QR코드 생성
	public void createQRCodeImage(String text, int width, int height, int qrDarkColor, int qrLightColor)
			throws WriterException, IOException {
		QRCodeWriter qrCodeWriter = new QRCodeWriter();
		BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height); // 텍스트, 바코드 포맷,가로,세로

		MatrixToImageConfig config = new MatrixToImageConfig(qrDarkColor, qrLightColor); // 진한색, 연한색
		BufferedImage qrImage = MatrixToImageWriter.toBufferedImage(bitMatrix, config);

		File temp = File.createTempFile(text, ".png");
		
		File file = new File("c:\\qrtest.jpg");        // 파일의 이름을 설정한다
        ImageIO.write(qrImage, "jpg", file);                     // write메소드를 이용해 파일을 만든다
		
		ImageIO.write(qrImage, "png", temp); // temp 위치에 qr이 이미지 생성됨.
		InputStream is = new FileInputStream(temp.getAbsolutePath()); // 인풋 스트림으로 변환(향후 S3로 업로드하기위한 작업)

		// 로직처리후 temp.delete() 와 is.close()를 해줘야함.
	}
}
