package ido.arduino.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeleteFormationDto {
	
	private int teamID; 
	private int formCode;

}
