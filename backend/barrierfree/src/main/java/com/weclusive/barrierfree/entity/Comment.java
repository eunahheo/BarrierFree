package com.weclusive.barrierfree.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	@Column(name="cmt_seq")
	private long cmtSeq;
	
	@Column(name="user_seq")
	private int userSeq;
	
	@Column(name="post_seq")
	private long postSeq;
	
	@Column(name="cmt_content")
	private String cmtContent;
	
	@Column(name="del_yn")
	private char delYn;

	@Column(name="reg_dt")
	private String regDt;
	
	@Column(name="reg_id")
	private String regId;
	
	@Column(name="mod_dt")
	private String modDt;
	
	@Column(name="mod_id")
	private String modId;

	@Builder
	public Comment(int userSeq, long postSeq, String cmtContent, char delYn, String regDt, String regId, String modDt,
			String modId) {
		super();
		this.userSeq = userSeq;
		this.postSeq = postSeq;
		this.cmtContent = cmtContent;
		this.delYn = delYn;
		this.regDt = regDt;
		this.regId = regId;
		this.modDt = modDt;
		this.modId = modId;
	}
	
	
}
