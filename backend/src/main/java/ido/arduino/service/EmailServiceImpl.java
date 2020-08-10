package ido.arduino.service;

import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import ido.arduino.dto.RequestDTO;
import ido.arduino.dto.TeamInfoDto;
import ido.arduino.dto.TeamInfoSimpleDto;
import ido.arduino.dto.TeamLeaderDTO;
import ido.arduino.dto.UserDTO;

@Service
public class EmailServiceImpl {

	private static final String BASE_URL = "http://i3a112.p.ssafy.io";

	JavaMailSender emailSender;

	public void setJavaMailSender(JavaMailSender javaMailSender) {
		this.emailSender = javaMailSender;
	}

	@Async
	// 가입 신청 알림 이메일
	public int requestToJoinMail(UserDTO requestFrom, TeamLeaderDTO targetTeam) {
		String title = "[Futsalah] 팀 가입 신청이 도착했습니다.";
		try {
			// 신청자 정보
			String requestorName = requestFrom.getName();
			String requestorEmail = requestFrom.getEmail();
			String requestorPosition = requestFrom.getPosition();

			if (requestorPosition.length() < 1) {
				requestorPosition = "선택하지 않음";
			}

			// 신청팀 & 해당 팀 리더 정보
			String leaderName = targetTeam.getLeaderName();
			String sendTo = targetTeam.getEmail();
			String teamName = targetTeam.getTeamName();
			int teamID = targetTeam.getTeamID();

			MimeMessage message = emailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

			// 보낼 대상 설정
			helper.setTo(sendTo);
			// 메일 제목
			helper.setSubject(title);
			// 메일 내용 + 요청 보내는 유저 정보

			String str = "<h2> 안녕하세요, " + leaderName + "님!</h2>" + "<h3>" + requestorName + "님께서 " + teamName
					+ "팀 가입을 요청하였습니다. </h3>" + "<br/> 요청자 이름: " + requestorName + "<br/> Email: " + requestorEmail
					+ "<br/> 포지션: " + requestorPosition + "<h4>아래의 버튼을 클릭하여 승인 요청을 확인해주세요!</h4> <br/>" + "<a href='"
					+ BASE_URL + "/teaminfo/" + teamID + "'>"
					+ "<button type='button' style='width: 350px; height: 50px; background: #0fb930; color:#fff;text-align: center; line-height: 50px;font-weight: bold;"
					+ "border-radius: 5px; border: 0; cursor: pointer; font-size: 1.2rem'>요청 수락/거절 하러 가기</button></a>";
			helper.setText(str, true);

			// 보내기 !!
			emailSender.send(message);
			return 1; // 성공
		} catch (Exception e) {
			e.printStackTrace();
			return 0; // 실패
		}
	}

	@Async
	// 팀 가입 요청 수락 알림 이메일
	public int approvedToJoinMail(RequestDTO requestFrom, TeamInfoDto targetTeam) {
		String title = "[Futsalah] 팀 가입 신청 결과가 도착했습니다.";
		try {
			// 신청자 정보
			String requestorName = requestFrom.getName();
			String sendTo = requestFrom.getEmail();

			// 신청팀 정보
			String teamName = targetTeam.getName();
			int teamID = targetTeam.getTeamID();

			MimeMessage message = emailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

			helper.setTo(sendTo);
			helper.setSubject(title);

			String str = "<h2> 안녕하세요, " + requestorName + "님!</h2>" 
					+ "<br/>요청하신 <span style='font-weight: bold;'>"+teamName+ "</span>팀 가입 신청이 수락되었습니다.<br/>" 
					+ "<h4>아래 버튼을 클릭하여 가입하신 " + teamName + "팀 정보를 확인해보세요!</h4> <br/>" + "<a href='"
					+ BASE_URL + "/teaminfo/" + teamID + "'>"
					+ "<button type='button' style='width: 350px; height: 50px; background: #0fb930; color:#fff;text-align: center; line-height: 50px;font-weight: bold;"
					+ "border-radius: 5px; border: 0; cursor: pointer; font-size: 1.2rem'>새로 가입한 팀 보러 가기</button></a>";
			helper.setText(str, true);

			emailSender.send(message);
			return 1; // 성공
		} catch (Exception e) {
			e.printStackTrace();
			return 0; // 실패
		}
	}
	
	@Async
	// 팀 가입 요청 거절 알림 이메일
	public int refusedToJoinMail(RequestDTO requestFrom, TeamInfoDto targetTeam) {
		String title = "[Futsalah] 팀 가입 신청 결과가 도착했습니다.";
		try {
			// 신청자 정보
			String requestorName = requestFrom.getName();
			String sendTo = requestFrom.getEmail();

			// 신청팀 정보
			String teamName = targetTeam.getName();

			MimeMessage message = emailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

			helper.setTo(sendTo);
			helper.setSubject(title);

			String str = "<h2> 안녕하세요, " + requestorName + "님!</h2>" 
					+ "<br/>아쉽게도 <span style='font-weight: bold;'>"+teamName+ "</span>팀 가입 신청이 거절되었습니다.<br/>" 
					+ "<h4>FutSalah의 다른 팀들에 가입 신청을 보내보세요!</h4> <br/>" + "<a href='"
					+ BASE_URL + "/searchteam'>"
					+ "<button type='button' style='width: 350px; height: 50px; background: #0fb930; color:#fff;text-align: center; line-height: 50px;font-weight: bold;"
					+ "border-radius: 5px; border: 0; cursor: pointer; font-size: 1.2rem'>새로운 팀 보러 가기</button></a>";
			helper.setText(str, true);

			emailSender.send(message);
			return 1; // 성공
		} catch (Exception e) {
			e.printStackTrace();
			return 0; // 실패
		}
	}
}
