package ido.arduino.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Alias("QRInfoDTO")
public class QRInfoDTO {
	private String home;
	private String away;
	private int homeLate;
	private int awayLate;
}
