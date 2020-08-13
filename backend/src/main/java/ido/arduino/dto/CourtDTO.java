package ido.arduino.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Alias("CourtDTO")
public class CourtDTO {
	private int courtID;
	private String name;
}
