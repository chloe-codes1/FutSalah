package ido.arduino.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamInfoDto {
	// 팀정보
	private int teamID;
	private int wins;
	private int defeats;
	private int draws;
	private int points;
	private String code;
	private String description;
	private Integer mileage;
	private String profileURL;
	private String name;

	/*
	 * //팀이름 중복 public int compareTo(TeamInfoDto o) {
	 * 
	 * if (o != null && o.name != null && name != null) { return
	 * name.compareTo(o.name); } return 0; }
	 */
}
