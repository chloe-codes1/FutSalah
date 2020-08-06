package ido.arduino.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Result {
	
	private int resultID;
	private int matchID;
	private int homeScore;
	private int awayScore;
	
}
