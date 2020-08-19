package ido.arduino.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ResultDto {
	
	private int matchID;
	private int homeScore;
	private int awayScore;
	private String homeTeam;
	private String awayTeam;
	
}
