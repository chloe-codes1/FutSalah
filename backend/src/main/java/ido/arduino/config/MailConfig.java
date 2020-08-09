package ido.arduino.config;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

@Component
//@PropertySources({@PropertySource("classpath:mail.properties"), @PropertySource("classpath:gmail.yml")})
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
	@Value("${gmail}")
	private String username;
	@Value("${password}")
	private String password;
	
	@Bean public JavaMailSender javaMailService() { 
		System.out.println("---------------------JavaMailSender---------------------");
		JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl(); 
		javaMailSender.setHost("smtp.gmail.com"); 
		javaMailSender.setUsername(username); 
		javaMailSender.setPassword(password); 
		// -> 여기 비밀번호 입력해야 동작함  + 	Google 계정에 Less Secure App Access allow 하기
		javaMailSender.setPort(port); 
		
		System.out.println("username?" + username);
		System.out.println("password?" + password);
		
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
