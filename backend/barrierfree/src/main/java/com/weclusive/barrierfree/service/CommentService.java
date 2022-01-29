package com.weclusive.barrierfree.service;

import java.util.List;
import java.util.Optional;

import com.weclusive.barrierfree.entity.Comment;
import com.weclusive.barrierfree.entity.Post;

public interface CommentService {

	public List<Comment> readComments(long postSeq);

	public Optional<Comment> deleteByCmtSeq(long postSeq);
}
