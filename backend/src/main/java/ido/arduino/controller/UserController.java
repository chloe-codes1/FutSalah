package ido.arduino.controller;

import java.util.Calendar;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import ido.arduino.dto.MyTeamDto;
import ido.arduino.dto.UserDTO;
import ido.arduino.service.S3Service;
import ido.arduino.service.TeamInfoService;
import ido.arduino.service.UserService;

@Controller
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private TeamInfoService teamService;

	@Autowired
	private S3Service s3Service;

	// socialID로 조회
	@PostMapping("/login")
	public @ResponseBody UserDTO findUser(@RequestBody Map<String, String> data) {
		String socialID = data.get("socialID");
		UserDTO loggedUser = userService.findBySocialID(socialID);
		Calendar cal = Calendar.getInstance();
		if (loggedUser != null && loggedUser.getAge() != null) {
			loggedUser.setAge((cal.get(Calendar.YEAR) - loggedUser.getAge() + 1));
		}
		return loggedUser;
	}

	// userID로 조회
	@GetMapping("/login/{userID}")
	public @ResponseBody UserDTO findUserByID(@PathVariable int userID) {
		UserDTO loggedUser = userService.findByUserID(userID);
		Calendar cal = Calendar.getInstance();
		if (loggedUser != null && loggedUser.getAge() != null) {
			loggedUser.setAge((cal.get(Calendar.YEAR) - loggedUser.getAge() + 1));
		}
		return loggedUser;
	}

	// 회원 가입
	@PostMapping("/user")
	public @ResponseBody UserDTO createUser(@RequestBody UserDTO user) {
		userService.insert(user);
		return user;
	}

	// 회원 정보 수정
	@PutMapping("/user")
	public @ResponseBody int updateUser(@RequestBody UserDTO user) {
		int updateResult = userService.update(user);
		return updateResult;
	}
	
	// 회원 탈퇴
	@DeleteMapping("/user")
	public void deleteUser(@RequestParam("userID") int userID) {
		// 전체 팀 정보 가져오기
		List<MyTeamDto> myTeams = teamService.selectAllmyteam(userID);
		if (!myTeams.isEmpty()) {
			myTeams.forEach(team -> {
				int teamID = team.getTeamID();
				// 자신이 팀의 리더이면,
				if (team.getLeader() == userID) {
					// 전체 팀원 수 조회 후
					int numberOfCrews = teamService.getNumberOfCrews(teamID);
					// 자신을 제외한 팀원이 있을 경우
					if (numberOfCrews > 1) {
						// 한 사람을 선택해서
						int nextLeaderID = teamService.getNextLeader(userID, teamID);
						// 리더로 지정하고
						teamService.updateLeader(nextLeaderID, teamID);
						// userteamconn table을 삭제한다
						teamService.deleteCrew(teamID, userID);
					// 자신을 제외한 팀원이 없을 경우
					}else {
						// 팀을 삭제한다 (userteamconn은 CASCADE)
						teamService.delete(teamID);
					}
				// 자신이 팀 리더가 아니면,
				}else {
					// userteamconn table을 삭제한다
					teamService.deleteCrew(teamID, userID);
				}
			});
		}
		// 위의 작업 완료 후 유저 삭제
		userService.delete(userID);
	}

	// search user by name
	@GetMapping("/user/{name}")
	public @ResponseBody List<UserDTO> searchByName(@PathVariable String name) {
		List<UserDTO> list = userService.searchUsersByName(name);
		return list;
	}

	// 유저 프로필 사진 업로드
	@PostMapping("/user/upload/{userID}")
	public ResponseEntity<String> uploadFile(@PathVariable int userID,
			@RequestPart(value = "file") final MultipartFile multipartFile) {
		final String status = "user";
		s3Service.uploadFile(multipartFile, userID, status);
		final String response = "[" + multipartFile.getOriginalFilename() + "] uploaded successfully.";
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// email 중복 검사
	@PostMapping("/user/check")
	public @ResponseBody int checkIfEmailExists(@RequestBody Map<String, String> data) {
		String email = data.get("email");
		return userService.checkIfEmailExists(email);
	}
}
