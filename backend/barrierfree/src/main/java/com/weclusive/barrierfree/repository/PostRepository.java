package com.weclusive.barrierfree.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.weclusive.barrierfree.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
	
	public List<Post> findAll();	// 모든 게시글(삭제된 글 포함) 검색
	
	// 최신순으로 정렬한 게시글 100개 반환
	public List<Post> findTop100ByDelYnOrderByRegDtDesc(char delYn);	
	
	// 누적 스크랩 많은 순으로 정렬한 게시글 100개 반환	
	public List<Post> findTop100ByDelYnOrderByPostScrapDesc(char delYn);	
	
	// 최근 일주일 게시글 중 스크랩 많은 순으로 정렬한 게시글 100개 반환
	public List<Post> findTop100ByDelYnAndRegDtBetweenOrderByPostScrapDesc(char delYn, String startTime, String endTime);	
	
	// 팔로우한 계정의 게시글을 최신순으로 정렬한 게시글 100개 반환
	@Query(value="SELECT p FROM Post p WHERE p.delYn = 'n' AND p.userSeq IN (SELECT followingSeq FROM Follow WHERE userSeq = ?1) ORDER BY regDt DESC")
	public List<Post> findFollowPost(int userSeq);
	
	// 게시물 하나 전체 내용 가져오기
	@Query(value="SELECT p FROM Post p WHERE p.delYn = 'n' AND postSeq = ?1")
	public Optional<Post> findByPostSeq(long postSeq);
	
	
	
}
