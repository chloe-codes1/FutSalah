package ido.arduino.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TeamCreateRequest {
	String socialID;
	String description;
	String code;
	String name;
}
