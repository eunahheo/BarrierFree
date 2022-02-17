package com.weclusive.barrierfree.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.TourapiImage;

@Repository
public interface TourapiImageRepository extends JpaRepository<TourapiImage, Long> {
	
	// 해당 컨텐츠id에 대한 이미지 정보 반환
	public List<TourapiImage> findByDelYnAndContentId(char delYn, long contentId);
}

