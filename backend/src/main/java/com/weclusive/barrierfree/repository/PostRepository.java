package com.weclusive.barrierfree.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

	// 모든 게시글(삭제된 글 포함) 검색
	public List<Post> findAll();

	// 게시글 수 반환
	public int countByDelYn(char delYn);
	
	// 알주일 게시글 수 반환
	public int countByDelYnAndRegDtBetweenOrderByPostScrapDesc(char delYn, String startTime,
			String endTime);
	
	// 팔로우한 계정의 게시글을 최신순으로 정렬한 게시글 수 반환
	@Query(value = "SELECT COUNT(p) FROM Post p WHERE p.delYn = 'n' AND p.userSeq IN (SELECT followingSeq FROM Follow WHERE userSeq = ?1) ORDER BY regDt DESC")
	public int countFollowPost(int userSeq);
	
	// 최신순으로 정렬한 게시글 반환
	public Page<Post> findByDelYnOrderByRegDtDesc(char delYn, Pageable pageable);

	// 누적 스크랩 많은 순으로 정렬한 게시글 반환
	public Page<Post> findByDelYnOrderByPostScrapDesc(char delYn, Pageable pageable);

	// 최근 일주일 게시글 중 스크랩 많은 순으로 정렬한 게시글 반환
	public Page<Post> findByDelYnAndRegDtBetweenOrderByPostScrapDesc(char delYn, String startTime,
			String endTime, Pageable pageable);

	// 팔로우한 계정의 게시글을 최신순으로 정렬한 게시글 반환
	@Query(value = "SELECT p FROM Post p WHERE p.delYn = 'n' AND p.userSeq IN (SELECT followingSeq FROM Follow WHERE userSeq = ?1) ORDER BY regDt DESC")
	public Page<Post> findFollowPost(int userSeq, Pageable pageable);

	// 게시물 하나 전체 내용 가져오기
	@Query(value = "SELECT p FROM Post p WHERE p.delYn = 'n' AND postSeq = ?1")
	public Post findByPostSeqP(long postSeq);

	// 게시물 하나 전체 내용 가져오기
	@Query(value = "SELECT p FROM Post p WHERE p.delYn = 'n' AND postSeq = ?1")
	public Optional<Post> findByPostSeq(long postSeq);

	// 해당 컨텐츠id에 대한 게시글 20개 반환
	public List<Post> findTop20ByDelYnAndContentIdOrderByPostScrapDesc(char delYn, long contentId);
	
	// 해당 컨텐츠id에 대한 게시글 4개 반환
	public List<Post> findTop4ByDelYnAndContentIdOrderByPostScrapDesc(char delYn, long contentId);

	// 회원의 게시글 수 반환
	@Query(value = "SELECT COUNT(p) FROM Post p WHERE p.delYn = 'n' AND p.userSeq = ?1")
	public int countByUserSeq(int userSeq);

	// 회원의 게시글 전체 반환(최신순)
	@Query(value = "SELECT p FROM Post p WHERE p.delYn = 'n' AND p.userSeq = ?1 ORDER BY p.regDt DESC")
	public List<Post> findByAllPosts(int userSeq);

	// 통합 검색 - 사용자 게시글 검색하기(제목, 내용, 지역으로 검색)
	public Page<Post> findByDelYnAndPostTitleContainingOrPostContentContainingOrPostLocationContaining(char delYn,
			String keyword, String keyword2, String keyword3, Pageable pageable);

}
