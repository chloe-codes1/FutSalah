package ido.arduino.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Alias("CourtAdminDTO")
public class CourtAdminDTO {
	private int adminID;
	private String id;
	private int stadiumID;
	private String name;
}
