package ido.arduino;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

@ServletComponentScan
@SpringBootApplication
public class BackendApplication {
	private static final String PROPERTIES = "classpath:/mysql.yml" + ",classpath:/aws.yml"
			+ ",classpath:/application.properties";

	public static void main(String[] args) throws JSchException, InterruptedException {
		System.setProperty("spring.config.location", PROPERTIES);
		SpringApplication.run(BackendApplication.class, args);
		
	}
}