package ido.arduino.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import ido.arduino.dto.CourtDTO;
import ido.arduino.dto.LocationDto;
import ido.arduino.dto.MatchDto;
import ido.arduino.dto.MatchInfoDTO;
import ido.arduino.dto.RequestDTO;
import ido.arduino.dto.TeamInfoDto;
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
	// 팀 가입 신청 알림 이메일
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
					+ "<br/> 포지션: " + requestorPosition + "<br/><h4>아래의 버튼을 클릭하여 승인 요청을 확인해주세요!</h4> <br/>" + "<a href='"
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
					+ "<br/><h4>아래 버튼을 클릭하여 가입하신 " + teamName + "팀 정보를 확인해보세요!</h4> <br/>" + "<a href='"
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
					+ "<br/><h4>FutSalah의 다른 팀들에 가입 신청을 보내보세요!</h4> <br/>" + "<a href='"
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
	
	@Async
	// 매칭 신청 알림 이메일
	public int registerForGameMail(TeamInfoDto requestTeam, TeamLeaderDTO targetTeam) {
		String title = "[Futsalah] 매치 요청이 도착했습니다.";
		try {
			// 신청팀 정보
			String requestorName = requestTeam.getName();
			String requestorDescription = requestTeam.getDescription();
			
			Optional<Integer> maybeWins = Optional.ofNullable(requestTeam.getWins());
			int requestorWins = maybeWins.orElse(0);
			Optional<Integer> maybeDraws = Optional.ofNullable(requestTeam.getDraws());
			int requestorDraws = maybeDraws.orElse(0);
			Optional<Integer> maybeDefeats = Optional.ofNullable(requestTeam.getDefeats());
			int requestorDefeats = maybeDefeats.orElse(0);
			Optional<Integer> maybeReliability = Optional.ofNullable(requestTeam.getReliability());
			int requestorReliability = maybeReliability.orElse(0);
			
			// 매칭 등록팀 리더 정보
			String leaderName = targetTeam.getLeaderName();
			String sendTo = targetTeam.getEmail();
			String teamName = targetTeam.getTeamName();

			MimeMessage message = emailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

			// 보낼 대상 설정
			helper.setTo(sendTo);
			// 메일 제목
			helper.setSubject(title);
			// 메일 내용 + 요청 보내는 유저 정보

			String str = "<h2> 안녕하세요, " + leaderName + "님!</h2>" + "<h3>" + requestorName + "팀에서 " + teamName
					+ "팀과의 매치를 요청하였습니다. </h3>" 
					+ "<br/> <span style='font-weight: bold;'>요청팀 이름: </span>" + requestorName 
					+ "<br/> <span style='font-weight: bold;'>팀 소개: </span>" + requestorDescription
					+ "<br/> <span style='font-weight: bold;'>전적 (승/무/패): </span>" + requestorWins + " / " + requestorDraws + " / " + requestorDefeats
					+ "<br/> <span style='font-weight: bold;'>신뢰도 마일리지: </span>" + requestorReliability
					//TODO: endpoint 확인 후 변경 필요
					+ "<br/><h4>아래의 버튼을 클릭하여 승인 요청을 확인해주세요!</h4> <br/>" + "<a href='"
					+ BASE_URL + "/match'>"
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
	// 매치 신청 수락 알림 이메일
	public int acceptMatchRequestMail(TeamInfoDto targetTeam, TeamLeaderDTO requestTeam, MatchDto matchInfo, LocationDto location, CourtDTO court) {
		String title = "[Futsalah] 매치 요청 결과가 도착했습니다.";
		try {
			// 신청팀 정보
			String requestorName = requestTeam.getTeamName();
			String leaderName = requestTeam.getLeaderName();
			String sendTo = requestTeam.getEmail();

			// 대결팀 정보
			int teamID = targetTeam.getTeamID();
			String teamName = targetTeam.getName();
			
			// 대결 정보
			Date date = matchInfo.getDate();
			int time = matchInfo.getTime();
			String sido = location.getSido();
			String gu = location.getGu();
			String courtName;
			if (court != null) {
				courtName = court.getName();
			}else {
				courtName = "구장 정보 없음";
			}
			
			MimeMessage message = emailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

			helper.setTo(sendTo);
			helper.setSubject(title);

			String str = "<h2> 안녕하세요, " + requestorName + "팀의 리더 " + leaderName+"님!</h2>" 
					+ "<br/>요청하신 <span style='font-weight: bold;'>"+teamName+ "</span>팀과의 경기 신청이 수락되었습니다.<br/>" 
					+ "<br/> <span style='font-weight: bold;'>일시: </span>" + date + time +"시" 
					+ "<br/> <span style='font-weight: bold;'>장소: </span>" + sido+ " " +gu 
					+ "<br/> <span style='font-weight: bold;'>구장 이름: </span>" + courtName 

					+ "<br/><h4>아래 버튼을 클릭하여 대결할 " + teamName + "팀 정보를 확인해보세요!</h4> <br/>" + "<a href='"
					+ BASE_URL + "/teaminfo/" + teamID + "'>"
					+ "<button type='button' style='width: 350px; height: 50px; background: #0fb930; color:#fff;text-align: center; line-height: 50px;font-weight: bold;"
					+ "border-radius: 5px; border: 0; cursor: pointer; font-size: 1.2rem'>상대팀 보러 가기</button></a>";
			helper.setText(str, true);

			emailSender.send(message);
			return 1; // 성공
		} catch (Exception e) {
			e.printStackTrace();
			return 0; // 실패
		}
	}
	@Async
	// 매치 신청 거절 알림 이메일
	public int refuseMatchRequestMail(TeamInfoDto targetTeam, TeamLeaderDTO requestTeam) {
		String title = "[Futsalah] 매치 요청 결과가 도착했습니다.";
		try {
			// 신청팀 정보
			String requestorName = requestTeam.getTeamName();
			String leaderName = requestTeam.getLeaderName();
			String sendTo = requestTeam.getEmail();

			// 대결팀 정보
			String teamName = targetTeam.getName();

			MimeMessage message = emailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

			helper.setTo(sendTo);
			helper.setSubject(title);

			String str = "<h2> 안녕하세요, " + requestorName + "팀의 리더 "+leaderName+ "님!</h2>" 
					+ "<br/>아쉽게도 <span style='font-weight: bold;'>"+teamName+ "</span>팀과의 매치 요청이 거절되었습니다.<br/>" 
					+ "<br/><h4>FutSalah의 다른 팀들에 매치 신청을 보내보세요!</h4> <br/>" + "<a href='"
					+ BASE_URL + "/match'>"
					+ "<button type='button' style='width: 350px; height: 50px; background: #0fb930; color:#fff;text-align: center; line-height: 50px;font-weight: bold;"
					+ "border-radius: 5px; border: 0; cursor: pointer; font-size: 1.2rem'>매치 목록 보러 가기</button></a>";
			helper.setText(str, true);
			emailSender.send(message);
			return 1; // 성공
		} catch (Exception e) {
			e.printStackTrace();
			return 0; // 실패
		}
	}
	
	@Async
	// 매치가 삭제됨을 알리는 이메일
	public int notifyMatchCancelledMail(MatchInfoDTO matchInfo, TeamLeaderDTO requestTeam) {
		String title = "[Futsalah] 매치 요청 결과가 도착했습니다.";
		try {
			// 신청팀 정보
			String requestorName = requestTeam.getTeamName();
			String leaderName = requestTeam.getLeaderName();
			String sendTo = requestTeam.getEmail();
			
			System.out.println("email"+ sendTo);
			// 신청한 매치 정보
			String teamName = matchInfo.getName();
			LocalDate date = matchInfo.getDate();
			int time = matchInfo.getTime();
			String sido = matchInfo.getSido();
			String gu = matchInfo.getGu();

			MimeMessage message = emailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

			helper.setTo(sendTo);
			helper.setSubject(title);

			String str = "<h2> 안녕하세요, " + requestorName + "팀의 리더 "+leaderName+ "님!</h2>" 
					+ "<br/><br/>아쉽게도 신청하신 <span style='font-weight: bold;'>"+teamName+ "</span>팀과의 경기가 매치 등록 팀에 의해 삭제되었습니다.<br/>" 
					+ "<br/>[ 삭제된 매치 상세 정보 ] "
					+ "<br/><br/><span style='font-weight: bold;'>팀 이름: </span>" + teamName
					+ "<br/><span style='font-weight: bold;'>일시: </span>" + date + " " + time + "시"
					+ "<br/><span style='font-weight: bold;'>장소: </span>" + sido + gu
					+ "<br/><br/><h4>FutSalah의 다른 팀들에 매치 신청을 보내보세요!</h4> <br/>" + "<a href='"
					+ BASE_URL + "/match'>"
					+ "<button type='button' style='width: 350px; height: 50px; background: #0fb930; color:#fff;text-align: center; line-height: 50px;font-weight: bold;"
					+ "border-radius: 5px; border: 0; cursor: pointer; font-size: 1.2rem'>매치 목록 보러 가기</button></a>";
			helper.setText(str, true);
			emailSender.send(message);
			return 1; // 성공
		} catch (Exception e) {
			e.printStackTrace();
			return 0; // 실패
		}
	}
}
