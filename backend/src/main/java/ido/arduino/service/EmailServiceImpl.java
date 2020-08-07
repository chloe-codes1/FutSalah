package ido.arduino.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

public class EmailServiceImpl implements EmailService{

	JavaMailSender emailSender;
	
	public void setJavaMailSender (JavaMailSender javaMailSender) {
		this.emailSender = javaMailSender;
	}
	
	public void sendMail (String sendTo, String title, String content, String userID) {
		SimpleMailMessage message = new SimpleMailMessage();
		//보낼 대상 설정
		message.setTo(sendTo);
		//메일 제목
		message.setSubject(title);
		//메일 내용 + 보내는 유저 아이디
		message.setText("보낸 UserID : " + userID + "        내용: " +content);
		
		//보내기 !!
		emailSender.send(message);
	}
}
