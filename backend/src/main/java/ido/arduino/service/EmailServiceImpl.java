package ido.arduino.service;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import ido.arduino.dao.TeamMapper;
import ido.arduino.dao.UserMapper;
import ido.arduino.dto.TeamInfoDto;
import ido.arduino.dto.TeamLeaderDTO;
import ido.arduino.dto.UserDTO;

@Service
public class EmailServiceImpl{

	@Autowired
	UserMapper userMapper;
	
	@Autowired
	UserService userService;
	
	@Autowired
	TeamMapper teamMapper;

	@Value("${client.url}")
	private String url;

	JavaMailSender emailSender;

	public void setJavaMailSender(JavaMailSender javaMailSender) {
		this.emailSender = javaMailSender;
	}

	public int requestToJoinMail(int userID, int teamID) {
		String title = "[Futsalah] 팀원 가입 신청이 도착했습니다.";
		// 신청자 정보
		
		System.out.println("뭐야.." +  userID + teamID);
//		UserDTO requestFrom = userMapper.findByUserID(userID);
		UserDTO requestFrom = userService.findByUserID(userID);
		String requestorName = requestFrom.getName();
		String requestorEmail = requestFrom.getEmail();
		String requestorPosition = requestFrom.getPosition();

		// 신청팀 & 해당 팀 리더 정보
		TeamLeaderDTO targetTeam = teamMapper.getTeamLeaderInfo(teamID);
		String leaderName = targetTeam.getLeaderName();
		String sendTo = targetTeam.getEmail();
		String teamName = targetTeam.getTeamName();

		System.out.println("duh?" + requestFrom);
		System.out.println("duh?" + targetTeam);
		
		try {
			MimeMessage message = emailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

			// 보낼 대상 설정
			helper.setTo(sendTo);
			// 메일 제목
			helper.setSubject(title);
			// 메일 내용 + 보내는 유저 아이디

			String str = "<h1> 안녕하세요, " + leaderName + "님!</h1>" + "<br/><h3>" + requestorName + "님께서 " + teamName
					+ "팀 가입 요청을 보내셨습니다. </h3>" + "<br/> Username: " + requestorName + "<br/> Email: " + requestorEmail
					+ "<br/> Position: " + requestorPosition + "<br/> <h4>승인 요청을 확인해주세요!</h4>. <br/><br/>" + "<a href='"
					+ url + "/teaminfo/" + teamID + "'>"
					+ "<button type='button' style='width: 150px; height: 50px; background: #17e78c;color:#fff;text-align: center; line-height: 50px;font-weight: bold;"
					+ "border-radius: 5px; cursor: pointer; font-size: 1.3rem'>팀 가입 수락/거절 하러 가기</button></a>";
			helper.setText(str, true);

			// 보내기 !!
			emailSender.send(message);
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
}
