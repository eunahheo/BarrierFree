package com.weclusive.barrierfree.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.weclusive.barrierfree.entity.Post;

public interface OthersFeedRepository extends JpaRepository<Post, Long> {

	// 회원의 게시글 수 반환
	@Query(value = "SELECT COUNT(p) FROM Post p WHERE p.delYn = 'n' AND p.userSeq = ?1")
	public int countByUserSeq(int userSeq);

	@Query(value = "SELECT p FROM Post p WHERE p.delYn = 'n' AND p.userSeq = ?1 ORDER BY p.regDt DESC")
	public List<Post> findByUserSeq(int otherUserSeq);
}
