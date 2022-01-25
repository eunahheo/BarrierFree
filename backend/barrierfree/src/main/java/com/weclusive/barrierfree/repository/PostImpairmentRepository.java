package com.weclusive.barrierfree.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.entity.PostImpairment;

public interface PostImpairmentRepository extends JpaRepository<PostImpairment, Long> {
	
	public List<PostImpairment> findByPostSeq(long postSeq);	// 입력한 게시글 번호의 모든 장애정보를 반환
	
	@Query(value="SELECT code FROM PostImpairment WHERE postSeq = ?1 AND delYn = 'n'")	// 입력한 게시글 번호의 장애 공통코드만 반환
	public List<String> findImpairment(long postSeq);
	
	@Query(value = "SELECT count(pi) FROM PostImpairment pi WHERE pi.postSeq = ?1 AND pi.code = ?2 AND pi.delYn = 'n'")
	public int findPostImpairment(long postSeq, String code);
	
	@Query(value="SELECT pi FROM PostImpairment pi WHERE pi.delYn = 'n' AND postSeq = ?1")
	public Optional<PostImpairment> findOneByPostSeq(long postSeq);
	
}

/*
 
 public interface UserRepository extends JpaRepository<UserEntity, Long>, 
      JpaSpecificationExecutor<UserEntity> {

      @Query(value = "select count(v), date(v.createTimestamp) from UserEntity v group by date(v.createTimestamp)", 
             countQuery = "select count(1) from (select count(1) from UserEntity v group by date(v.createTimestamp)) z")
      public List<Object[]> findCountPerDay();
}
 
 */