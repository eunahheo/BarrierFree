package com.weclusive.barrierfree.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.weclusive.barrierfree.entity.PostImpairment;

public interface PostImpairmentRepository extends JpaRepository<PostImpairment, Long> {
	
	public List<PostImpairment> findByPostSeq(long postSeq);	// 입력한  게시글 번호의 모든 장애정보를 반환
	
	@Query(value="SELECT code FROM PostImpairment WHERE postSeq = ?1 AND delYn = 'n'")	// 입력한 게시글 번호의 장애 공통코드만 반환
	public List<String> findImpairment(long postSeq);
	
}
