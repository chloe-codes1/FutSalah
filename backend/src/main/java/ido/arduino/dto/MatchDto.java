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
	private int isBooked;// 경기장 유무 1:경기장 있음,0: 경기장 없음 
	private int locationID;
	private int state;// 매칭 상태 0:매칭 x, 1:매칭완료, 2:매칭 거절
	private int courtID; // 경기장 유무 ..?
	private String name;//경기장 이름
	private String gu; // 경기 지역 구 
	private int formCode;
	private String hometeam;//홈팀 이름 
	private String profileURL;// 팀 프로필 사진
	
	

	public MatchDto(Date date, int time, int isBooked, int locationID, int formCode) {
		super();
		this.date = date;
		this.time = time;
		this.isBooked = isBooked;
		this.locationID = locationID;
		this.formCode = formCode;
	}



	public MatchDto(Date date, int locationID) {
		super();
		this.date = date;
		this.locationID = locationID;
	}


	

	
}
