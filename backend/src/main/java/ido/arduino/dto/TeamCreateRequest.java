package ido.arduino.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamCreateRequest {
	private String socialID;
	private String description;
	private String code;
	private String name;
	private Integer locationID;
	private String profileURL;
}
