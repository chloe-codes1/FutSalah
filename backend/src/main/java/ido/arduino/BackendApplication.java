package ido.arduino;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
@ServletComponentScan
@SpringBootApplication
public class BackendApplication {
	private static final String PROPERTIES = 
			"classpath:/mysql.yml"
			+ ",classpath:/aws.yml"
			+ ",classpath:/application.properties";
	
	public static void main(String[] args) {
		System.setProperty("spring.config.location", PROPERTIES);
		SpringApplication.run(BackendApplication.class, args);
	}
}