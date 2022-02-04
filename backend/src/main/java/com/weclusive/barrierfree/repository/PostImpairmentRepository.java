package com.weclusive.barrierfree.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.entity.PostImpairment;

public interface PostImpairmentRepository extends JpaRepository<PostImpairment, Long> {
	
	// 입력한 게시글 번호의 모든 장애정보를 반환
	public List<PostImpairment> findByPostSeq(long postSeq);	
	
	// 입력한 게시글 번호의 장애 공통코드만 반환
	@Query(value="SELECT code FROM PostImpairment WHERE postSeq = ?1 AND delYn = 'n'")	
	public List<String> findImpairment(long postSeq);
	
	// 입력한 게시글의 번호의 삭제 안 된 모든 장애 정보 반환(delYn =n)
	@Query(value="SELECT pi FROM PostImpairment pi WHERE pi.delYn = 'n' AND postSeq = ?1")
	public List<PostImpairment> findOneByPostSeq(long postSeq);

	// 입력한 게시글 번호와 코드를 가진 장애 정보 반환
	@Query(value="SELECT pi FROM PostImpairment pi WHERE pi.delYn = 'n' AND pi.postSeq = ?1 AND pi.code = ?2")
	public Optional<PostImpairment> findOneByPostSeqCode(long postSeq, String code);
	
}