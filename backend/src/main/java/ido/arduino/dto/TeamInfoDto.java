package ido.arduino.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Alias("TeamInfoDTO")
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
	private int leader; // 팀을 생성한 userid
	private int locationID;

	public static TeamInfoDto of(TeamCreateRequest tcr, int userid, String code) {
		TeamInfoDto tid = new TeamInfoDto(0, 0, 0, 0, 0, code, tcr.getDescription(), 0, "", tcr.getName(), userid, tcr.getLocationID());

		return tid;
	}
	/*
	 * //팀이름 중복 public int compareTo(TeamInfoDto o) {
	 * 
	 * if (o != null && o.name != null && name != null) { return
	 * name.compareTo(o.name); } return 0; }
	 */
}
