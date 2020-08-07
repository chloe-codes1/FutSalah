package ido.arduino.config;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

@Component
@PropertySource("classpath:mail.properties")
public class MailConfig {

	Properties property = new Properties();
	@Value("${mail.smtp.port}")
	private int port;
	@Value("${mail.smtp.socketFactory.port}")
	private int socketPort;
	@Value("${mail.smtp.auth}")
	private boolean auth;
	@Value("${mail.smtp.starttls.enable}")
	private boolean starttls;
	@Value("${mail.smtp.starttls.required}")
	private boolean startlls_required;
	@Value("${mail.smtp.socketFactory.fallback}")
	private boolean fallback;

	@Bean public JavaMailSender javaMailService() { 
		JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl(); 
		javaMailSender.setHost("smtp.gmail.com"); 
		javaMailSender.setUsername("jmtroadhelpzmzmz@gmail.com"); 
		javaMailSender.setPassword(""); 
		// -> 여기 비밀번호 입력해야 동작함  + 	Google 계정에 Less Secure App Access allow 하기
		javaMailSender.setPort(port); 
		
		property.put("mail.smtp.socketFactory.port", socketPort); 
		property.put("mail.smtp.auth", auth); 
		property.put("mail.smtp.starttls.enable", starttls); 
		property.put("mail.smtp.starttls.required", startlls_required); 
		property.put("mail.smtp.socketFactory.fallback",fallback); 
		property.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory"); 
		
		javaMailSender.setJavaMailProperties(property); 
		javaMailSender.setDefaultEncoding("UTF-8"); return javaMailSender; 
		}

	
}
