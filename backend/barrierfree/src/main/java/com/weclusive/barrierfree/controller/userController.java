package com.weclusive.barrierfree.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.dto.User;
import com.weclusive.barrierfree.service.UserService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/api")
public class userController {

	@Autowired
	private UserService userService;

	@ApiOperation(value = "전체 유저 불러오기 ", response = List.class)
	@ApiResponses({ @ApiResponse(code = 200, message = "OK !!"),
			@ApiResponse(code = 500, message = "Internal Server Error !!"),
			@ApiResponse(code = 404, message = "Not Found !!") })
	
	@GetMapping()
	public ResponseEntity<List<User>> allUsers() throws Exception {
		return new ResponseEntity<List<User>>(userService.allUsers(), HttpStatus.OK);
	}
}