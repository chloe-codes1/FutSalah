package ido.arduino.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ido.arduino.repo.Matching2Repo;

@Service
public class Matching2ServiceImpl implements Matching2Service {
	@Autowired
	Matching2Repo mRepo;
}
