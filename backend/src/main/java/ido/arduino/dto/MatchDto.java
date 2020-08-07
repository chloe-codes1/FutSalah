package ido.arduino.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class MatchDto {
	private int matchID ;
	private int homeTeamID;
	private int awayTeamID;
	private Date date ;
	private int time;
	private int isBooked;
	private int locationID;
	private int state;
	private int stadium;
}
