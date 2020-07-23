package ido.arduino.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamDTO {
	
	
	private int teamID;
	private int wins;
	private int defeats;
	private int draws;
	private int points;
	private String code;
	private String description;
	private int mileage;
	private int guCode;
	private String profileURL;

}
