package com.weclusive.barrierfree.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

	public void uploadFile(MultipartFile pic) throws Exception;

}
