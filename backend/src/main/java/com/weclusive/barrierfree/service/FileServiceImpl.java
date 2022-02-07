package com.weclusive.barrierfree.service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartRequest;

@Service
public class FileServiceImpl implements FileService {

	@Override
	public void uploadFile(MultipartFile pic) throws Exception {

		MultipartFile mFile = pic;

		String filePath = "http://i6a504.p.ssafy.io:~/test/";

//		while(itr.hasNext()) {
//			Entry <String, MultipartFile> entry = Entry<String, MultipartFile>;
//			
//			mFile = entry.getValue();
//			
		String fileName = mFile.getOriginalFilename();
//			
//			String fileOutName = fileName.substring(0, fileName.lastIndexOf("."));
//			
//			String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1);
//			
		String saveFilePath = filePath + File.separator + fileName;
//			
//			File fileFolder = new File(filePath);
//			
//			if(!fileFolder.exists()) {
//				if(fileFolder.mkdirs()) {
//					System.out.println("success");
//				}
//				else
//					System.out.println("fail");
//			}
//			
		File saveFile = new File(saveFilePath);
//			
//			if(saveFile.isFile()) {
//				boolean _exist = true;
//				
//				int idx = 0;
//				
//				while(_exist) {
//					idx++;
//					
//					saveFileName = fileOutName + "(" + idx + ")." + fileExt;
//					
//					String dictFile = filePath + File.separator + saveFileName;
//					
//					_exist = new File(dictFile).isFile();
//					
//					if(!_exist) {
//						saveFilePath = dictFile;
//					}
//				}
//				
//				mFile.transferTo(new File(savaFilePath));
//			}
//			else {
		mFile.transferTo(saveFile);
	}
//		}
//	}

	@Override
	public void fileTest() {
		try {
			// 1. 파일 객체 생성
			File file = new File("C:\\Users\\SSAFY\\Downloads\\writeFile.txt");
			// 2. 파일 존재여부 체크 및 생성
			if (!file.exists()) {
				file.createNewFile();
			}
			// 3. Buffer를 사용해서 File에 write할 수 있는 BufferedWriter 생성
			FileWriter fw = new FileWriter(file);
			BufferedWriter writer = new BufferedWriter(fw);
			// 4. 파일에 쓰기
			writer.write("hi");
			// 5. BufferedWriter close
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}
