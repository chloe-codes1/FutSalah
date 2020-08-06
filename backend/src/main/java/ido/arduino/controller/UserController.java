package ido.arduino.controller;

import java.util.Calendar;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import ido.arduino.dto.UserDTO;
import ido.arduino.service.S3Service;
import ido.arduino.service.UserService;

@Controller
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600) // TODO: 배포 시 바꿔야 함
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private S3Service s3Service;

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

	@GetMapping("/login/{userID}")
	public @ResponseBody UserDTO findUserByID(@PathVariable int userID) {
		UserDTO loggedUser = userService.findByUserID(userID);
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
		public @ResponseBody int updateUser(@RequestBody UserDTO user) {
		System.out.println("user??????????" + user );
		int updateResult = userService.update(user);
		if (updateResult == 1) {
			System.out.println("successfully updated!");
		} else {
			System.out.println("user update failed..");
		}
		return updateResult;
	}

	@DeleteMapping("/user")
	public void deleteUser(@RequestParam("userID") int userID) {
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

	@PostMapping("/user/upload/{userID}")
	public ResponseEntity<String> uploadFile(@PathVariable int userID, @RequestPart(value = "file") final MultipartFile multipartFile) {
		System.out.println("file" + userID + multipartFile);
		final String status = "user";
		s3Service.uploadFile(multipartFile, userID, status);
		final String response = "[" + multipartFile.getOriginalFilename() + "] uploaded successfully.";
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
