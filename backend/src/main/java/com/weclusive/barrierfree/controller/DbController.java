package com.weclusive.barrierfree.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.service.DbServiceImpl;


@RestController
@CrossOrigin("*")
@RequestMapping("/db")
public class DbController {
	@Autowired
	private DbServiceImpl dbService;
	
	@PostMapping("/tour")
	public ResponseEntity<String> tourdb(@RequestParam int pageNo, @RequestParam String serviceKey, @RequestParam int numOfRows) {
		
		try {
			dbService.searchContentId(pageNo, serviceKey, numOfRows);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<String>("db", HttpStatus.OK);
	}
}
