package ido.arduino.repo;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class Matching2RepoImpl implements Matching2Repo {
	private static String ns = "ido.arduino.mapper.Matching2DTO.";
	
	@Autowired
	SqlSessionTemplate template;
}
