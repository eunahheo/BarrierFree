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
public class CommonCode {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	@Column(name="code_seq")
	private int codeSeq;
	
	@Column(name="code_group")
	private String codeGroup;
	
	private String code;
	
	@Column(name="value")
	private String value;
	
	@Column(name="code_order")
	private int codeOrder;
	
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
}
