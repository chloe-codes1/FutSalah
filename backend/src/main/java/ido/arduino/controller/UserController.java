package ido.arduino.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import ido.arduino.dto.UserDTO;
import ido.arduino.service.UserService;

@Controller
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // TODO: 배포 시 바꿔야 함
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/login")
	public UserDTO findUser(@RequestBody String socialID) {
		System.out.println("socialID?????" + socialID);
		UserDTO loggedUser = userService.findBySocialID(socialID);
		System.out.println("current user?" + loggedUser);
		return loggedUser;
	}

	@PostMapping("/user")
	public UserDTO createUser(@RequestBody UserDTO user) {
		System.out.println("user??????????" + user);
		int newlySignedUp = userService.insert(user);
		if (newlySignedUp == 1) {
			System.out.println("successfully created!");
		} else {
			System.out.println("signup failed...ㅠ_ㅠ");
		}
		return user;
	}

	@PutMapping("/user")
	public void updateUser(@RequestBody UserDTO user) {
		System.out.println("user??????????" + user);
		int updateResult = userService.update(user);
		if (updateResult == 1) {
			System.out.println("successfully updated!");
		} else {
			System.out.println("user update failed..ㅠ_ㅠ");
		}
	}

	@DeleteMapping("/user")
	public void deleteUser(@RequestBody int userID) {
		System.out.println("userID????" + userID);
		int deleteResult = userService.delete(userID);
		if (deleteResult == 1) {
			System.out.println("successfully deleted!");
		} else {
			System.out.println("user delete failed...ㅠ_ㅠ");
		}
	}
}
