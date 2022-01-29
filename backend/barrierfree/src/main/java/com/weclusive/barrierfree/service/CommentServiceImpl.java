package com.weclusive.barrierfree.service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.Comment;
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

}
