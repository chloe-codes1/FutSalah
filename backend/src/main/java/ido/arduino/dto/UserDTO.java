package ido.arduino.dto;

import javax.print.attribute.standard.DateTimeAtCreation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
	private Integer userID;
	private String name;
	private String email;
	private DateTimeAtCreation createdAt;
	private	Integer age;
	private String position;
	private Integer height;
	private Integer weight;
	private String socialID;
	private String profileURL;
}
