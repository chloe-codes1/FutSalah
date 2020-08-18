package ido.arduino.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WaitMatchDto {
	private int matchID; 
	private int teamID;

	private int wins;
	private int defeats;
	private int draws;
	private int points;
	private String code;
	private String description;
	private Integer reliability;
	private String profileURL;
	private String name;
	private int leader; // 팀을 생성한 userid
	private int locationID;
	
	
	public WaitMatchDto(int matchID, int teamID) {
		super();
		this.matchID = matchID;
		this.teamID = teamID;
	}

	
	
}
