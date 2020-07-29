package ido.arduino.dto;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Alias("UserDTO")
public class UserDTO {
	private Integer userID;
	private String name;
	private String email;
	private Date createdAt;
	private Integer age;
	private String position;
	private Integer height;
	private Integer weight;
	private String socialID;
	private String profileURL;
}
