package ido.arduino.dto;

import java.time.LocalDate;

import org.apache.ibatis.type.Alias;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Alias("WaitingDTO")
public class WaitingDTO {
	private Integer waitingID;
	private Integer matchID;
	private Integer awayTeamID;
	private LocalDate createdAt;
	
	
}
