package ido.arduino.controller;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ido.arduino.dto.UserDTO;
import ido.arduino.service.UserService;

@Controller
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600) // TODO: 배포 시 바꿔야 함
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/login")
	public @ResponseBody UserDTO findUser(@RequestBody Map<String, String> data) {
		String socialID = data.get("socialID");
		System.out.println("socialID?????" + socialID);
		UserDTO loggedUser = userService.findBySocialID(socialID);
		Calendar cal = Calendar.getInstance();
		if (loggedUser != null && loggedUser.getAge() != null) {
			loggedUser.setAge((cal.get(Calendar.YEAR) - loggedUser.getAge() + 1));
		}	
		System.out.println("current user?" + loggedUser);
		return loggedUser;
	}

	@PostMapping("/user")
	public @ResponseBody UserDTO createUser(@RequestBody UserDTO user) {
		System.out.println("user??????????" + user);
		int newlySignedUp = userService.insert(user);
		if (newlySignedUp == 1) {
			System.out.println("successfully created!");
		} else {
			System.out.println("signup failed...");
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
			System.out.println("user update failed..");
		}
	}

	@DeleteMapping("/user")
	public void deleteUser(@RequestBody int userID) {
		System.out.println("userID????" + userID);
		int deleteResult = userService.delete(userID);
		if (deleteResult == 1) {
			System.out.println("successfully deleted!");
		} else {
			System.out.println("user delete failed...");
		}
	}

	@GetMapping("/user/{name}")
	public @ResponseBody List<UserDTO> searchByName(@PathVariable String name) {
		System.out.println("name??" + name);
		List<UserDTO> list = userService.searchUsersByName(name);
		System.out.println("user list? " + list);
		return list;
	}
	// TODO: User 가입한 Team 목록

}
