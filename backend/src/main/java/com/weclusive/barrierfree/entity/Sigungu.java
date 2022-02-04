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
public class Sigungu {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sigungu_seq")
	private int sigunguSeq;
 
	@Column(name = "sido_code")
	private String sidoCode;
	
	@Column(name = "sigungu_code")
	private String sigunguCode;

	@Column(name = "sigungu_name")
	private String sigungu;

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
