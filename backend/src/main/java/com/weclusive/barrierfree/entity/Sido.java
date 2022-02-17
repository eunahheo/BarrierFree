package com.weclusive.barrierfree.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Sido {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sido_seq")
	private int sidoSeq;
 
	@Column(name = "sido_code")
	private String sidoCode;

	@Column(name = "sido_name")
	private String sidoName;

	@Column(name="del_yn")
	private char delYn = 'n';
	
	@Column(name="reg_dt")
	private String regDt;
	
	@Column(name="reg_id")
	private String regId;
	
	@Column(name="mod_dt")
	private String modDt;
	
	@Column(name="mod_id")
	private String modId;
}
