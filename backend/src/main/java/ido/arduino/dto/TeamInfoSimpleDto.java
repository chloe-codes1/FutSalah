package ido.arduino.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamInfoSimpleDto {
//팀 찾기 페이지에서 보여주는 정보들
	private int wins;
	private int defeats;
	private int draws;
	private String profileURL;
	private String name;
	private int teamID;

	

}
