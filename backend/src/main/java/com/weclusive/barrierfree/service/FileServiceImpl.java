package com.weclusive.barrierfree.service;

import java.io.File;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService {

	@Override
	public void uploadFile(MultipartFile pic) throws Exception {

		MultipartFile mFile = pic;

		// 업로드 할 사진 최상위 폴더
		String filePath = "/app";;
		filePath = filePath.replace("/", File.separator);
		
		// 경로 설정 + 날짜로 세부 디렉토리
		// File fileFolder = new File(filePath, getFolder());
		File fileFolder = new File(filePath);
		System.out.println("Path : " + fileFolder);
		
		// 폴더 없으면 생성하기
		if(!fileFolder.exists()) {
			fileFolder.mkdirs();
		}

		// 사진 이름
		String fileName = mFile.getOriginalFilename();
		
		// 겹치는 이름 피하기 위해서 UUID 사용
		UUID uuid = UUID.randomUUID();
		
		// uuid + _ + 원래 파일명
		fileName = uuid.toString() + "_" + fileName;
		
		String saveFilePath = fileFolder + File.separator + fileName;
			
		File saveFile = new File(saveFilePath);

		mFile.transferTo(saveFile);
	}

	// 오늘 날짜의 경로를 문자열로 생성한다.
	private String getFolder() {
		String date = LocalDateTime.now().toString().replace("-", File.separator).substring(0, 10);
		return date;
	}

}
