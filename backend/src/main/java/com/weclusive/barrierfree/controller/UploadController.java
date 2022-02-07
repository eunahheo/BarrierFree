package com.weclusive.barrierfree.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.weclusive.barrierfree.service.FileService;
import com.weclusive.barrierfree.service.MainService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/upload")
@Api("사진 업로드")
public class UploadController {

	@Autowired
	FileService fileService;

	@PostMapping("/img")
	public void post(@RequestPart(value = "picture", required = true) MultipartFile pic) {
		try {
			fileService.uploadFile(pic);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@PostMapping("/img1")
	public void post1(@RequestPart(value = "picture", required = true) MultipartFile pic) {
		try {
			fileService.uploadFile1(pic);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
