package com.weclusive.barrierfree.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.weclusive.barrierfree.entity.Scrap;

public interface ScrapRepository extends JpaRepository<Scrap, Long> {
	
	// 사용자가 스크랩한 게시물인지 확인(스크랩 했으면1, 아니면 0)
	public int countByDelYnAndScrapTypeAndUserSeqAndScrapData(char delYn, char scrapType, int userSeq, long scrapData);
		
	// scrapData에 해당하는 사용자 작성 게시글이나 관광공사API 상세정보글의 스크랩 된 횟수 반환
	public int countByDelYnAndScrapTypeAndScrapData(char delYn, char scrapType, long scrapData);
	
	// 스크랩 수 반환
	public int countByDelYnAndScrapTypeAndUserSeq(char delYn, char scrapType, int userSeq);

}
