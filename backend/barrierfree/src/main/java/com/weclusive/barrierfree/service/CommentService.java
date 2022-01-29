package com.weclusive.barrierfree.service;

import java.util.List;

import com.weclusive.barrierfree.entity.Comment;

public interface CommentService {

	public List<Comment> readComments(long postSeq);
}
