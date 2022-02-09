package com.weclusive.barrierfree.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.weclusive.barrierfree.service.FileService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/upload")
@Api("사진 업로드")
public class UploadController {

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	FileService fileService;

	@PostMapping("/photo")
	@ApiOperation(value = "사진 업로드", notes = "사용자가 입력한 사진을 업로드한다.")
	public ResponseEntity<String> photoUpload(@RequestPart(value = "photo", required = true) MultipartFile pic) {
		String result = "";
		try {
			result = fileService.uploadFile(pic);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
}
