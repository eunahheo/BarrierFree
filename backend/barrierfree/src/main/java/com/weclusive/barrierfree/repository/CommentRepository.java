package com.weclusive.barrierfree.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.weclusive.barrierfree.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{
	
	// 게시글에 달린 모든 댓글 조회(del_yn = n)
	@Query(value="SELECT c FROM Comment c WHERE c.delYn = 'n' AND c.postSeq = ?1")
	public List<Comment> findCommentsPostSeq(long postSeq);
}
