package ido.arduino.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import ido.arduino.dto.UserDTO;

@Controller
public class UserController {
	
	@Autowired
	
	
	
	@PostMapping("/user")
	public UserDTO createUser(@RequestBody UserDTO user) {
		UserDTO loggedUser =  
		return 
	}
}
