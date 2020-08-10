package ido.arduino.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Team Leader 상세 정보 + Team 정보

@Data
@AllArgsConstructor
@NoArgsConstructor
@Alias("TeamLeaderDTO")
public class TeamLeaderDTO {
	private Integer userID;
	private String leaderName;
	private String email;
	private Integer teamID;
	private String teamName;
	private String description;
}
