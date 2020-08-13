package ido.arduino.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class MatchRequestDto {
	private Date date ;
	private int time;
	private int isBooked; // 경기장 유무 1:경기장 있음,2: 경기장 없음 
	private int locationID;  // 경기 지역 구 
	private int formCode;
}

