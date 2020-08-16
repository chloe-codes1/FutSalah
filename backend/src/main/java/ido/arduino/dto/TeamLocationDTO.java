package ido.arduino.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Team 정보 + Location 상세정보

@Data
@AllArgsConstructor
@NoArgsConstructor
@Alias("TeamLocationDTO")
public class TeamLocationDTO {
	private int teamID;
	private int wins;
	private int defeats;
	private int draws;
	private int points;
	private String code;
	private String description;
	private Integer reliability;
	private String profileURL;
	private String name;
	private int leader; 
	private int locationID;
	private String sido;
	private String gu;
	private int total;
}
