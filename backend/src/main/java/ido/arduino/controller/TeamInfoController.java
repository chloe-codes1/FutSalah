package ido.arduino.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageConfig;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import ido.arduino.dto.DeleteFormationDto;
import ido.arduino.dto.Formation;
import ido.arduino.dto.MyTeamDto;
import ido.arduino.dto.RequestDTO;
import ido.arduino.dto.ResultDto;
import ido.arduino.dto.TeamCreateRequest;
import ido.arduino.dto.TeamInfoDto;
import ido.arduino.dto.TeamInfoSimpleDto;
import ido.arduino.dto.TeamLeaderDTO;
import ido.arduino.dto.TeamLocationDTO;
import ido.arduino.dto.UserDTO;
import ido.arduino.dto.UserTeamConnDto;
import ido.arduino.service.EmailServiceImpl;
import ido.arduino.service.RequestService;
import ido.arduino.service.S3Service;
import ido.arduino.service.S3ServiceImpl;
import ido.arduino.service.TeamInfoService;
import ido.arduino.service.UserService;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class TeamInfoController {
	private static final Logger logger = LoggerFactory.getLogger(TeamInfoController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	S3ServiceImpl s3ServiceImpl;

	@Autowired
	S3Service s3Service;

	@Autowired
	TeamInfoService tService;

	@Autowired
	UserService uService;

	@Autowired
	RequestService rService;

	@Autowired
	JavaMailSender javaMailSender;

	@Value("${aws.s3.bucket}")
	private String bucketName;

	// ----------------create team---------------------------

	// 팀 이름 중복검사
	@GetMapping("/team/check/{name}")
	public @ResponseBody int checkIfExists(@PathVariable String name) {
		return tService.checkIfExists(name);
	}

	// 팀원 추가
	@PostMapping("/team/crew")
	public @ResponseBody int addCrewIntoTeam(@RequestBody Map<String, Integer> data) {
		int userID = data.get("userID");
		int teamID = data.get("teamID");
		return tService.insertmy(new UserTeamConnDto(userID, teamID, LocalDate.now()));
	}

	// 팀 생성하기
	@ApiOperation(value = "새로운 팀 정보 등록.", response = String.class)
	@PostMapping("/team")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody TeamCreateRequest teamInfo) {
		ResponseEntity<Map<String, Object>> entity = null;

		int id = 0;
		try {
			// 생성 시 부여 받을 TeamID 값
			id = getAutoIncrement();
			System.out.println(">>>>>>>>>>>>>>>>>>>>" + id);
			createQRCodeImage(Integer.toString(id), 350, 350, 0x00000000, 0xFFFFFFFF);
		} catch (WriterException e) {
			System.out.println("QR생성 실패");
		} catch (IOException e) {
			System.out.println("QR생성 실패");
		}
		try {
			UserDTO user = uService.findBySocialID(teamInfo.getSocialID());
			int userId = user.getUserID();
			String code = "QR" + Integer.toString(id);
			System.out.println(">>>>>>>>>>>>>>>>>>>>" + code);
			TeamInfoDto newTeam = TeamInfoDto.of(teamInfo, userId, code);
			int lastTeamId = tService.insert(newTeam);
			tService.insertmy(new UserTeamConnDto(userId, lastTeamId, LocalDate.now()));
			entity = handleSuccess(newTeam.getClass() + "가 추가되었습니다.");
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
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int teamID) {
		ResponseEntity<Map<String, Object>> entity = null;
		try {
			int result = tService.delete(teamID);
			entity = handleSuccess(teamID + "가 삭제되었습니다.");
		} catch (RuntimeException e) {
			entity = handleException(e);
		}
		return entity;
	}

	// 팀 프로파일 이미지 업로드
	@PostMapping("/team/upload/{teamID}")
	public ResponseEntity<String> uploadFile(@PathVariable int teamID,
			@RequestPart(value = "file") final MultipartFile multipartFile) {
		System.out.println("file" + teamID + multipartFile);
		final String status = "team";
		s3Service.uploadFile(multipartFile, teamID, status);
		final String response = "[" + multipartFile.getOriginalFilename() + "] uploaded successfully.";
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// ----------------join team--------------------------
	// 팀 가입 신청
	@PostMapping("/team/join")
	public @ResponseBody int requestToJoin(@RequestBody Map<String, Integer> data) {
		int userID = data.get("userID");
		int teamID = data.get("teamID");
		int isRequested = rService.checkIfRequested(userID, teamID);

		// 중복 신청 막기
		if (isRequested == 1) {
			return 2;
		}

		rService.insert(userID, teamID);
		UserDTO requestFrom = uService.findByUserID(userID);
		TeamLeaderDTO targetTeam = tService.getTeamLeaderInfo(teamID);
		EmailServiceImpl emailService = new EmailServiceImpl();
		emailService.setJavaMailSender(javaMailSender);
		return emailService.requestToJoinMail(requestFrom, targetTeam);
	}

	// 팀 가입 요청 수락
	@PostMapping("/team/join/approve")
	public @ResponseBody int approveToJoin(@RequestBody Map<String, Integer> data) {
		int userID = data.get("userID");
		int teamID = data.get("teamID");
		RequestDTO currentRequest = rService.getRequest(teamID, userID);
		int requestID = currentRequest.getRequestID();
		rService.delete(requestID);
		tService.insertmy(new UserTeamConnDto(userID, teamID, LocalDate.now()));
		TeamInfoDto targetTeam = tService.getTeamInfo(teamID);
		EmailServiceImpl emailService = new EmailServiceImpl();
		emailService.setJavaMailSender(javaMailSender);
		return emailService.approvedToJoinMail(currentRequest, targetTeam);
	}

	// 팀 가입 요청 거절
	@PostMapping("/team/join/refuse")
	public @ResponseBody int refuseToJoin(@RequestBody Map<String, Integer> data) {
		int userID = data.get("userID");
		int teamID = data.get("teamID");
		RequestDTO currentRequest = rService.getRequest(teamID, userID);
		int requestID = currentRequest.getRequestID();
		TeamInfoDto targetTeam = tService.getTeamInfo(teamID);
		rService.delete(requestID);
		EmailServiceImpl emailService = new EmailServiceImpl();
		emailService.setJavaMailSender(javaMailSender);
		return emailService.refusedToJoinMail(currentRequest, targetTeam);
	}

	// 해당 팀의 가입 요청 목록 가져오기
	@GetMapping("/team/join/{teamID}")
	public @ResponseBody List<RequestDTO> getAllRequests(@PathVariable int teamID) {
		return rService.getAllRequests(teamID);
	}

	// ----------------find team---------------------------

	@ApiOperation(value = "모든 팀 정보를 반환한다.", response = List.class)
	@GetMapping("/team")
	public ResponseEntity<List<TeamInfoSimpleDto>> selectAll() throws Exception {
		logger.debug("selectAll - 호출");
		System.out.println("CaaaORS Filtering on...........................................................");

		return new ResponseEntity<List<TeamInfoSimpleDto>>(tService.selectAll(), HttpStatus.OK);
	}

	// 팀 검색 by 1) name 2) location 3) both
	@ApiOperation(value = "팀 검색 by 1) name 2) location 3) both", response = List.class)
	@PostMapping("/team/search/{condition}/{page}")
	public @ResponseBody List<TeamLocationDTO> searchTeam(@PathVariable String condition, @PathVariable int page,
			@RequestBody Map<String, String> data) {
		page = (page - 1) * 6;
		List<TeamLocationDTO> list = new ArrayList<>();
		if (condition.equals("name")) {
			String name = data.get("name");
			list = tService.searchTeamByName(name, page);
		} else if (condition.equals("location")) {
			String gu = data.get("gu");
			list = tService.searchTeamByLocation(gu, page);
		} else if (condition.equals("both")) {
			String name = data.get("name");
			String gu = data.get("gu");
			list = tService.searchTeamByBoth(name, gu, page);
		}
		return list;
	}

	// ----------------my team---------------------------
	// 나의 팀 목록에서 확인하기
	@ApiOperation(value = "내가 속한 모든 팀 정보를 반환한다. ", response = List.class)
	@PostMapping("/team/my")
	public ResponseEntity<List<MyTeamDto>> selectAllmyteam(@RequestBody Map<String, Object> body) throws Exception {
		System.out.println(body.toString());
		UserDTO user = uService.findBySocialID((String) body.get("socialID"));
		int userId = user.getUserID();
		logger.debug("selectAllmyteam - 호출");
		System.out.println("check.............................");

		return new ResponseEntity<List<MyTeamDto>>(tService.selectAllmyteam(userId), HttpStatus.OK);
	}

	// 나의 팀 나가기
	@ApiOperation(value = "나의 팀 나가기.", response = String.class)
	@DeleteMapping("/team/my")
	public ResponseEntity<Map<String, Object>> deletemyteam(@RequestBody Map<String, Integer> data) {
		try {
			
			UserTeamConnDto utc = new UserTeamConnDto(teamID, userID, LocalDate.now());
			TeamInfoDto currentTeam = tService.getTeamInfo(teamID);
			if (currentTeam.getLeader() == userID) {
				int numberOfCrews = tService.getNumberOfCrews(teamID);
				if (numberOfCrews > 1) {
					// 한 사람을 선택해서
					int nextLeaderID = tService.getNextLeader(userID, teamID);
					// 리더로 지정하고
					tService.updateLeader(nextLeaderID, teamID);
					// userteamconn table에서 삭제한다
					tService.deletemyteam(utc);
				}
			}
			entity = handleSuccess(teamID + "가 삭제되었습니다.");
		} catch (RuntimeException e) {
			entity = handleException(e);
		}
		return entity;
	}

	// ----------------team info---------------------------

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

	// 팀원 방출
	@PostMapping("/team/member")
	public @ResponseBody int deleteCrew(@RequestBody Map<String, Integer> data) {
		int teamID = data.get("teamID");
		int userID = data.get("userID");
		return tService.deleteCrew(teamID, userID);
	}

	// ----------------formation---------------------------
	// formation 삽입
	@ApiOperation(value = "포메이션 삽입 ", response = List.class)
	@PostMapping("/team/formation")
	public ResponseEntity<Map<String, Object>> insertformation(@RequestBody Formation form) {
		ResponseEntity<Map<String, Object>> entity = null;

		try {

			TeamInfoDto team = tService.getTeamInfo(form.getTeamID());
			int result = tService.insertformation(form);
			entity = handleSuccess(form.getClass() + "가 수정되었습니다.");
		} catch (RuntimeException e) {
			entity = handleException(e);
		}

		return entity;
	}

	// formation 수정하기
	@ApiOperation(value = "formation 정보 수정.", response = String.class)
	@PutMapping("/team/formation")
	public ResponseEntity<Map<String, Object>> updateformation(@RequestBody Formation form) {
		ResponseEntity<Map<String, Object>> entity = null;
		try {
			int result = tService.updateformation(form);
			entity = handleSuccess(form.getClass() + "가 수정되었습니다.");
		} catch (RuntimeException e) {
			entity = handleException(e);
		}
		return entity;
	}

	// 팀 정보 삭제
	@ApiOperation(value = "포메이션 정보 삭제.", response = String.class)
	@DeleteMapping("/team/formation/{teamID}/{formCode}")
	public ResponseEntity<Map<String, Object>> deleteformation(@PathVariable int teamID, @PathVariable int formCode) {
		ResponseEntity<Map<String, Object>> entity = null;
		try {
			DeleteFormationDto form = new DeleteFormationDto(teamID, formCode);
			tService.deleteformation(form);
			System.out.println("왜 안불러어어어어ㅓㅇ.............................");
			// int result = tService.deleteformation(teamID);
			entity = handleSuccess(teamID + "가 삭제되었습니다.");
		} catch (RuntimeException e) {
			entity = handleException(e);
		}
		return entity;
	}

	@ApiOperation(value = "포메이션 정보 반환한다.", response = List.class)
	@GetMapping("/team/formation/{teamID}")
	public ResponseEntity<List<Formation>> selectformation(@PathVariable int teamID) throws Exception {
		logger.debug("selectformation - 호출");
		System.out.println("호오오오추우울...........................................................");

		return new ResponseEntity<List<Formation>>(tService.selectformation(teamID), HttpStatus.OK);
	}

	// ----------------result game---------------------------
	// 경기전적
	@ApiOperation(value = "게임 결과 정보 반환한다.", response = List.class)
	@GetMapping("/team/result/{teamID}")
	public ResponseEntity<List<ResultDto>> resultscore(@PathVariable int teamID) throws Exception {
		logger.debug("resultscore - 호출");
		System.out.println("resultscore호추추루룰...........................................................");

		return new ResponseEntity<List<ResultDto>>(tService.resultscore(teamID), HttpStatus.OK);
	}

	// ----------------QR코드 생성---------------------------
	// QR코드 생성
	public void createQRCodeImage(String text, int width, int height, int qrDarkColor, int qrLightColor)
			throws WriterException, IOException {
		QRCodeWriter qrCodeWriter = new QRCodeWriter();
		BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height); // 텍스트, 바코드 포맷,가로,세로
		MatrixToImageConfig config = new MatrixToImageConfig(qrDarkColor, qrLightColor); // 진한색, 연한색
		BufferedImage qrImage = MatrixToImageWriter.toBufferedImage(bitMatrix, config);

		// File file = new File("c:\\qrtest.jpg"); // 파일의 이름을 설정한다
		// ImageIO.write(qrImage, "jpg", file); // write메소드를 이용해 파일을 만든다

		String title = "QR" + text;
		File temp = File.createTempFile(title, ".png");
		ImageIO.write(qrImage, "png", temp); // temp 위치에 qr이 이미지 생성됨.
		// InputStream is = new FileInputStream(temp.getAbsolutePath()); // 인풋 스트림으로
		// 변환(향후 S3로 업로드하기위한 작업)
		s3ServiceImpl.uploadQRToS3Bucket(bucketName, temp, title);

		// 로직처리후 temp.delete() 와 is.close()를 해줘야함.
		temp.delete();
	}

	// 다음 auto-increment 값 가져오기
	public int getAutoIncrement() {
		int autoIn = 0;
		autoIn = tService.getNextTeamId() + 1;

		return autoIn;
	}

	// ----------------예외처리---------------------------

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
