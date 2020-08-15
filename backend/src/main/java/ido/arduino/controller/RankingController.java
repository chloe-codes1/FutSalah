package ido.arduino.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ido.arduino.dto.TeamInfoDto;
import ido.arduino.service.RankingService;

@Controller
@RequestMapping("/api")
public class RankingController {
	
	@Autowired
	private RankingService rankingService;
	
	@GetMapping("/rank")
	public @ResponseBody List<TeamInfoDto> getBestTeams(){
		return rankingService.getBestTeams();
	}
	
	@PostMapping("/rank")
	public @ResponseBody List<TeamInfoDto> getBestTeamsEachLocations (@RequestBody Map<String, Integer> data){
		int locationID = data.get("locationID");
		return rankingService.getBestTeamsEachLocations(locationID);
	}
}
