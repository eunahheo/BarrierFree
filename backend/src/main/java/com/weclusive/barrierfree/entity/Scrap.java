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

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Scrap {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	@Column(name="scrap_seq")
	private long scrapSeq;
	
	@Column(name="user_seq")
	private int userSeq;
	
	@Column(name="scrap_type")
	private char scrapType; 
	
	@Column(name="scrap_data")
	private long scrapData;
	
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
	
	@Builder
	public Scrap(int userSeq, char scrapType, Long scrapData, String regDt, String regId, String modDt, String modId) {
		this.userSeq = userSeq;
		this.scrapType = scrapType;
		this.scrapData = scrapData;
		this.regDt = regDt;
		this.regId = regId;
		this.modDt = modDt;
		this.modId = modId;
	}
	
}
