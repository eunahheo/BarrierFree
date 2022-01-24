package com.weclusive.barrierfree.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
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
	
	@Column(name="pi_seq")
	long piSeq;
	@Column(name="post_no")
	long postNo;
	String code;
	@Column(name="del_yn")
	char delYn;
	@Column(name="reg_dt")
	String regDt;
	@Column(name="reg_id")
	String regId;
	@Column(name="mod_dt")
	String modDt;
	@Column(name="mod_id")
	String modId;
}
