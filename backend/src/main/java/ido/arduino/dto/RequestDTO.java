package ido.arduino.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// 팀 가입 신청

@Data
@AllArgsConstructor
@NoArgsConstructor
@Alias("RequestDTO")
public class RequestDTO {
	private int RequestID;
	private int userID;
	private int teamID;
	private String name;
	private String email;
	private int age;
	private String position;
	private int height;
	private int weight;
	private String socialID;
	private String profileURL;
}
