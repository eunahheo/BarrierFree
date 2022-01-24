package com.weclusive.barrierfree.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.weclusive.barrierfree.entity.Scrap;

public interface ScrapRepository extends JpaRepository<Scrap, Long> {
	
	public int countByDelYnAndScrapTypeAndUserSeqAndScrapData(char delYn, String scrapType, int userSeq, long scrapData);	// 사용자가 스크랩한 게시물인지 확인(스크랩 했으면1, 아니면 0)

}
