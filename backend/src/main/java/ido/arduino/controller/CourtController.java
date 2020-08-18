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
	
	@ApiOperation(value="게임 시작", response = String.class)
	@PostMapping("/gameStart")
	public void gameStart(@RequestBody QRInfoDTO data) throws JSchException {
		// QR 지각 관련
		
		/////
		
		
		String homeTeam = "team1";
		String awayTeam = "team2";
		
		String name = "pi";
		String host = "192.168.0.9";
		int port = 22;
		String password = "root";

		System.out.println("==> Connecting to " + host);
		Session session = null;
		Channel channel = null;

		try {
			// JSch 객체 생성
			JSch jsch = new JSch();
			session = jsch.getSession(name, host, port);

			// 패스워드 설정
			session.setPassword(password);

			// 세션 관련 정보 설정
			java.util.Properties config = new java.util.Properties();
			// 호스트 정보 검사 x
			config.put("StrictHostKeyChecking", "no");
			session.setConfig(config);

			// 접속
			session.connect();

			// sftp 채널 오픈
			channel = session.openChannel("exec");

			// SSH용 채널 객체로 캐스팅
			ChannelExec channelExec = (ChannelExec) channel;
			System.out.println("==> Connected to " + host);

			channelExec.setCommand("python3 /home/pi/Desktop/goal.py " + homeTeam + " " + awayTeam);

			channelExec.connect();
			System.out.println("==> Connected to " + host);

		} finally {
			if (channel != null) {
				channel.disconnect();
			}
			if (session != null) {
				session.disconnect();
			}
		}
	}
}
