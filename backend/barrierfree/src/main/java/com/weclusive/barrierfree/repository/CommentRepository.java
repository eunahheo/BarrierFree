package com.weclusive.barrierfree.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.weclusive.barrierfree.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{
	
	// 게시글에 달린 모든 댓글 조회(del_yn = n)
	@Query(value="SELECT c FROM Comment c WHERE c.delYn = 'n' AND c.postSeq = ?1")
	public List<Comment> findCommentsPostSeq(long postSeq);

	// 댓글 하나 전체 내용 가져오기
	@Query(value="SELECT c FROM Comment c WHERE c.delYn = 'n' AND c.cmtSeq = ?1")
	public Optional<Comment> findByCmtSeq(long cmtSeq);
}
