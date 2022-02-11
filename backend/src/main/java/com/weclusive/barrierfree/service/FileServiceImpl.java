package com.weclusive.barrierfree.service;

import java.io.File;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService {

	@Override
	public String uploadFile(MultipartFile pic) throws Exception {

		MultipartFile mFile = pic;

		// 업로드 할 사진 최상위 폴더
		String filePath = "/app";
		filePath = filePath.replace("/", File.separator);
		
		// 경로 설정 + 날짜로 세부 디렉토리
		File fileFolder = new File(filePath);
		
		// 폴더 없으면 생성하기
		if(!fileFolder.exists()) {
			fileFolder.mkdirs();
		}

		// 사진 이름
		String fileName = mFile.getOriginalFilename();
		
		// 겹치는 이름 피하기 위해서 UUID 사용
		UUID uuid = UUID.randomUUID();
		
		// uuid + _ + 원래 파일명
		fileName = getDate() + uuid.toString() + "_" + fileName;
		
		String saveFilePath = fileFolder + File.separator + fileName;
			
		File saveFile = new File(saveFilePath);


		// EC2에 저장
		mFile.transferTo(saveFile);
		System.out.println("EC2 Path : " + saveFilePath);
		
		// 테이블에 이미지 경로 저장
		String DBFilePath = File.separator + "images";
		DBFilePath += File.separator + fileName;
		System.out.println("DB Save Path : " + DBFilePath);
		
		return DBFilePath;
	}

	// 오늘 날짜를 문자열로 생성한다.
	private String getDate() {
		String date = LocalDateTime.now().toString().replace("-", "").substring(0, 8);
		return date + "_";
	}
}
