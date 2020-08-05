package ido.arduino.dto;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Alias("Matching2DTO")
public class Matching2DTO {
	private int matchID;
	private int homeTeamID;
	private int awayTeamID;
	private Date date;
	private int time;
	private int isBooked;
	private int locationID;
	private int state;
	private int stadium;
}
