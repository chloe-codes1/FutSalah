package ido.arduino.dto;

import java.time.LocalDate;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Alias("MatchInfoDTO")
public class MatchInfoDTO {
	private LocalDate date;
	private Integer time;
	private String sido;
	private String gu;
	private Integer teamID;
	private String name;
}
