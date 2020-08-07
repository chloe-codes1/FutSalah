package ido.arduino.service;

public interface EmailService {

	public void sendMail (String sendTo, String title, String content, String userID);
}
