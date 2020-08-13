package ido.arduino.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class MatchRequestSimpleDto {
	
	private Date date ;
	private String gu; // 경기 지역 구 

}
