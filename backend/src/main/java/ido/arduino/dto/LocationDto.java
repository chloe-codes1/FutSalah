package ido.arduino.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Alias("LocationDTO")
public class LocationDto {

	private int locationID;
	private String sido;
	private String gu;

}
