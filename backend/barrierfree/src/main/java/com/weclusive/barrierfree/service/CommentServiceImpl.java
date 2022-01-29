package com.weclusive.barrierfree.service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.Comment;
import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.repository.CommentRepository;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentRepository commentRepository;

	@Override
	public List<Comment> readComments(long postSeq) {
		List<Comment> comments = commentRepository.findCommentsPostSeq(postSeq);
		if(comments.isEmpty())
			return null;
		else
			return comments;
	}


	// 댓글 삭제하기
	@Override
	public Optional<Comment> deleteByCmtSeq(long cmtSeq) {
		Optional<Comment> deleteComment = commentRepository.findByCmtSeq(cmtSeq);
		
		if(deleteComment != null) {
			deleteComment.get().setDelYn('y');
			commentRepository.save(deleteComment.get());
			return deleteComment;
		}
		else
			return null;
	}

}
