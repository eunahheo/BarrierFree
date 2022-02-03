package com.weclusive.barrierfree.dto;

import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class CommentSave {
	@Column(name="user_seq")
	private int userSeq;
	
	@Column(name="post_seq")
	private long postSeq;
	
	@Column(name="cmt_content")
	private String cmtContent;
}
