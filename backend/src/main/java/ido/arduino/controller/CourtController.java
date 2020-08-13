package ido.arduino.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ido.arduino.dto.CourtAdminDTO;
import ido.arduino.service.CourtService;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class CourtController {

	@Autowired
	private CourtService courtService;
	
	@ApiOperation(value = "구장 관리자 로그인", response = String.class)
	@PostMapping("/courtLogin")
	public @ResponseBody CourtAdminDTO login(@RequestBody Map<String, String> data) {
		String id = data.get("id");
		String password = data.get("password");
		
		if (courtService.checkValid(id, password) == 1) {
			return courtService.login(id);
		} else {
			return null;
		}
	}
}
