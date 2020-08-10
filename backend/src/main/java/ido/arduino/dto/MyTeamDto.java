package ido.arduino.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyTeamDto {
	// 나의 팀 목록
	
	private int teamID;
	private String description;
	private String profileURL;
	private String name;
	private int leader;
}
