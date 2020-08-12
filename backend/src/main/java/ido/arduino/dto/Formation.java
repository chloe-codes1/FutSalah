package ido.arduino.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Formation {
	// 지역 가져올 dto
	private int userID;
	private int teamID;
	private int formCode;
	private int grid;
	private String name;
	private String position;

}
