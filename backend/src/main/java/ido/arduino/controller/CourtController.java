package ido.arduino.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

import ido.arduino.dto.CourtAdminDTO;
import ido.arduino.dto.QRInfoDTO;
import ido.arduino.dto.ResultDto;
import ido.arduino.service.CourtService;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class CourtController {

	@Autowired
	private CourtService courtService;

	@ApiOperation(value = "구장 관리자 로그인", response = String.class)
	@PostMapping("/courtLogin")
	public @ResponseBody CourtAdminDTO login(@RequestBody Map<String, String> data) {
		String id = data.get("id");
		String password = data.get("password");

		if (courtService.checkValid(id, password) == 1) {
			return courtService.login(id);
		} else {
			return null;
		}
	}

	@ApiOperation(value = "게임 시작", response = String.class)
	@PostMapping("/gameStart")
	public void gameStart(@RequestBody QRInfoDTO data) throws JSchException {
		// QR 지각 관련
		if (data.getHomeLate() == 1) {
			// 신뢰도 10 -
			courtService.reliability(data.getHome(), 10);
		} else if (data.getHomeLate() == 2) {
			// 신뢰도 20 - 
			courtService.reliability(data.getHome(), 20);
		}
		
		if (data.getAwayLate() == 1) {
			courtService.reliability(data.getAway(), 10);
		} else if (data.getAwayLate() == 2) {
			courtService.reliability(data.getAway(), 10);
		}
		
		// 라즈베리파이 파이썬 코드 실행
		String rasp_name = "pi";
		String host1 = "192.168.219.107";
		String host2 = "192.168.219.104";
		int port = 22;
		String password = "root";

		System.out.println("==> Connecting to " + host1);
		Session session1 = null;
		Session session2 = null;
		Channel channel1 = null;
		Channel channel2 = null;

		try {
			// JSch 객체 생성
			JSch jsch1 = new JSch();
			JSch jsch2 = new JSch();
			session1 = jsch1.getSession(rasp_name, host1, port);
			session2 = jsch2.getSession(rasp_name, host2, port);

			// 패스워드 설정
			session1.setPassword(password);
			session2.setPassword(password);

			// 세션 관련 정보 설정
			java.util.Properties config = new java.util.Properties();
			// 호스트 정보 검사 x
			config.put("StrictHostKeyChecking", "no");
			session1.setConfig(config);
			session2.setConfig(config);

			// 접속
			session1.connect();
			session2.connect();

			// sftp 채널 오픈
			channel1 = session1.openChannel("exec");
			channel2 = session2.openChannel("exec");

			// SSH용 채널 객체로 캐스팅
			ChannelExec channelExec1 = (ChannelExec) channel1;
			ChannelExec channelExec2 = (ChannelExec) channel2;
			System.out.println("==> Connected to " + host1);

			channelExec1.setCommand("python3 /home/pi/Desktop/goal.py");
			channelExec2.setCommand("python3 /home/pi/Desktop/goal2.py");

			channelExec1.connect();
			channelExec2.connect();
			System.out.println("==> Connected to " + host1);

		} finally {
			if (channel1 != null) {
				channel1.disconnect();
			}
			if (channel2 != null) {
				channel2.disconnect();
			}
			if (session1 != null) {
				session1.disconnect();
			}
			if (session2 != null) {
				session2.disconnect();
			}
		}
	}

	@ApiOperation(value = "게임 종료", response = String.class)
	@PostMapping("/gameFinish")
	public void gameFinish(@RequestBody ResultDto data) throws JSchException {
		// 전적 업데이트
		if (data.getHomeScore() > data.getAwayScore()) {
			String name = data.getHomeTeam();
			String result = "wins";
			courtService.modifyRecord(name, result);
			
			name = data.getAwayTeam();
			result = "defeats";
			courtService.modifyRecord(name, result);
		} else if (data.getHomeScore() == data.getAwayScore()) {
			String name = data.getHomeTeam();
			String result = "draws";
			courtService.modifyRecord(name, result);
			
			name = data.getAwayTeam();
			courtService.modifyRecord(name, result);
		} else {
			String name = data.getHomeTeam();
			String result = "defeats";
			courtService.modifyRecord(name, result);
			
			name = data.getAwayTeam();
			result = "wins";
			courtService.modifyRecord(name, result);
		}
		// Result 테이블에 갱신
		courtService.insertResult(data);
		
		// 포인트 업데이트
		String name = data.getHomeTeam();
		courtService.modifyPoints(name);
		name = data.getAwayTeam();
		courtService.modifyPoints(name);
		
		
		// 라즈베리파이 파이썬 코드 종료
		String rasp_name = "pi";
		// 라즈베리파이 ip
		String host1 = "192.168.219.107";
		String host2 = "192.168.219.104";
		int port = 22;
		String password = "root";

		System.out.println("==> Connectiong to " + host1);
		Session session1 = null;
		Session session2 = null;
		Channel channel1 = null;
		Channel channel2 = null;

		try {
			// JSch 객체 생성
			JSch jsch1 = new JSch();
			JSch jsch2 = new JSch();
			session1 = jsch1.getSession(rasp_name, host1, port);
			session2 = jsch2.getSession(rasp_name, host1, port);

			// 패스워드 설정
			session1.setPassword(password);
			session2.setPassword(password);

			// 세션 관련 정보 설정
			java.util.Properties config = new java.util.Properties();
			// 호스트 정보 검사 x
			config.put("StrictHostKeyChecking", "no");
			session1.setConfig(config);
			session2.setConfig(config);

			// 접속
			session1.connect();
			session2.connect();

			// sftp 채널 오픈
			channel1 = session1.openChannel("exec");
			channel2 = session2.openChannel("exec");

			// SSH용 채널 객체로 캐스팅
			ChannelExec channelExec1 = (ChannelExec) channel1;
			ChannelExec channelExec2 = (ChannelExec) channel2;
			System.out.println("==> Connected to " + host1);

			System.out.println("kill python3");
			channelExec1.setCommand("sudo killall python3");
			channelExec2.setCommand("sudo killall python3");
			channelExec1.connect();
			channelExec2.connect();

		} catch (Exception e) {

		} finally {
			if (channel1 != null) {
				channel1.disconnect();
			}
			if (channel2 != null) {
				channel2.disconnect();
			}
			if (session1 != null) {
				session1.disconnect();
			}
			if (session2 != null) {
				session2.disconnect();
			}
		}
	}
}
