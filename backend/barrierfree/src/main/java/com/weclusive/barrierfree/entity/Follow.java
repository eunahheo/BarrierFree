package com.weclusive.barrierfree.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Follow {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "follow_seq")
	private long followSeq;

	@Column(name = "user_seq")
	private int userSeq;

	@Column(name = "following_seq")
	private int followingSeq;

	@Column(name = "del_yn")
	private char delYn = 'n';

	@Column(name = "reg_dt")
	private String regDt;

	@Column(name = "reg_id")
	private String regId;

	@Column(name = "mod_dt")
	private String modDt;

	@Column(name = "mod_id")
	private String modId;

	@Builder
	public Follow(int userSeq, int followingSeq, char delYn, String regDt, String regId, String modDt, String modId) {
		super();
		this.userSeq = userSeq;
		this.followingSeq = followingSeq;
		this.delYn = delYn;
		this.regDt = regDt;
		this.regId = regId;
		this.modDt = modDt;
		this.modId = modId;
	}

}
