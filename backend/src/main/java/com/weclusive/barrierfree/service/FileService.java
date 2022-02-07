package com.weclusive.barrierfree.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface FileService {

	public void uploadFile(MultipartFile pic) throws Exception;
	
	public void fileTest();
}
