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
public class PostImpairment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	@Column(name = "pi_seq")
	private long piSeq;

	@Column(name = "post_seq")
	private long postSeq;

	private String code;

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
	public PostImpairment(long postSeq, String code, String regDt, String regId, String modDt, String modId) {
		super();
		this.postSeq = postSeq;
		this.code = code;
		this.regDt = regDt;
		this.regId = regId;
		this.modDt = modDt;
		this.modId = modId;
	}
	
	

}
