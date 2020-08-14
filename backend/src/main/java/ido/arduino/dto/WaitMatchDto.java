package ido.arduino.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WaitMatchDto {
	private int matchID; 
	private int awayTeamID;
	

}
