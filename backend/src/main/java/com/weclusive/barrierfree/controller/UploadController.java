package com.weclusive.barrierfree.controller;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
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
	
	@GetMapping(value = "/imgget", produces= MediaType.IMAGE_PNG_VALUE)
	public @ResponseBody byte[] get() throws IOException{
		FileInputStream fis = null;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

//        String fileDir = "D:\\Han\\sample\\" + filePath + "\\" + fileTime + "_" + value + ".png"; // 파일경로
        String fileDir = "/app/images/2022/02/09/" + "3c32a6e1-93e7-4f1e-a206-0e3c9362e6f1_alin.png";
//        String fileDir = "C:\\Users\\SSAFY\\Downloads\\alin.png";

        try{
            fis = new FileInputStream(fileDir);
        } catch(FileNotFoundException e){
            e.printStackTrace();
        }

        int readCount = 0;
        byte[] buffer = new byte[1024];
        byte[] fileArray = null;

        try{
            while((readCount = fis.read(buffer)) != -1){
                baos.write(buffer, 0, readCount);
            }
            fileArray = baos.toByteArray();
            fis.close();
            baos.close();
        } catch(IOException e){
            throw new RuntimeException("File Error");
        }
        return fileArray;
    }
}
