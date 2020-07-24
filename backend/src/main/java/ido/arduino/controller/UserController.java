package ido.arduino.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import ido.arduino.dto.UserDTO;
import ido.arduino.service.UserService;

@Controller
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/user")
	public UserDTO createUser(@RequestBody UserDTO user) {
		UserDTO loggedUser = userService.findBySocialID(user.getSocialID());
		if (loggedUser == null) {
			System.out.println("Incomming user!! welcome!!");
			int newlySignedUp = userService.insert(user);
			if (newlySignedUp == 1) {
				System.out.println("successfully created!");
				loggedUser = user;
			}else {
				System.out.println("signup failed...ㅠ_ㅠ");
			}
		}else {
			System.out.println("Existing user...hi there...");
		}
		
		return loggedUser;
	}
}
