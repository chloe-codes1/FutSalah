package ido.arduino.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private static final String[] AUTH_WHITELIST = {
			// swagger ui 사용하려고 spring security 피하기용!
			"/v2/api-docs", "/swagger-resources", "/swagger-resources/**", "/configuration/ui",
			"/configuration/security", "/swagger-ui.html", "/webjars/**",
			// 생성한 api url로 접근 허용하기
			"/api/login", "/api/user", "/api/user/*", "/api/user/upload/*", "/api/user/check", "/api/team",
			"/api/team/*", "/api/team/my", "/api/team/check/*", "/api/team/member/*", "/api/team/search/**",
			"/api/team/upload/*", "/api/team/join/*", "/api/team/formation/*", "/api/team/formation/*/*",
			"/api/match/fsearch/*", "/api/location", "/api/location/*", "/api/team/result/*", "/api/courtLogin",
			"/api/match/stadium/*", "/api/match", "/api/match2", "/api/match/*", "/api/match/*/*", "/api/match/*/*/*",
			"/api/waiting", "/api/rank", "/api/gameStart", "/api/gameFinish",
			// assets 허용
			"assets/*" };

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();

		http.headers().frameOptions().sameOrigin().httpStrictTransportSecurity().disable();

		// Whitelist에 있는 path 외에는 로그인 해야지만 접근 가능
		http.authorizeRequests().antMatchers(AUTH_WHITELIST).permitAll().anyRequest().authenticated();

		// 권한 밖의 page 접근 시 AccessDeniedException 발생시키기!
		http.authorizeRequests().and().exceptionHandling().accessDeniedPage("/403");
	}

}