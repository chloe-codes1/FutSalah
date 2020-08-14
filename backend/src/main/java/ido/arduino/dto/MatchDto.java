package ido.arduino.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class MatchDto {
	private int matchID;
	private int homeTeamID;
	private int awayTeamID;
	private String homeTeam;
	private String profileURL;
	private Date date;
	private int time;
	private int isBooked;// 경기장 유무 1:경기장 있음,0: 경기장 없음
	private int locationID;
	private int state;// 매칭 상태 0:매칭 x, 1:매칭완료, 2:매칭 거절
	private int courtID; // 경기장 유무 ..?
	private String name;// 경기장 이름
	private String sido; // 경기 지역 시도
	private String gu; // 경기 지역 구
	private int formCode;

}
