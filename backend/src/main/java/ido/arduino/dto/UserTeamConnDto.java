package ido.arduino.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserTeamConnDto {
	
	public int userID;
	public int teamID;
	private LocalDate createdAt;
}
