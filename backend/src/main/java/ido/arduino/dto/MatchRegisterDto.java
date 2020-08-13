package ido.arduino.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class MatchRegisterDto {
	
	private int matchID ;
	private String homeTeam; // 내팀 
	private String awayTeam; // 요청온 팀
	private int points; //신뢰도..?
	private int state;

}
