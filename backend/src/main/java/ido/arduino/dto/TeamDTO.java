package ido.arduino.dto;

import lombok.Data;

@Data
public class TeamDTO {
	private Integer teamID;
	private Integer wins;
	private Integer defeats;
	private Integer draws;
	private Integer points;
	private String code;
	private String description;
	private Integer mileage;
	private String profileURL;
}
