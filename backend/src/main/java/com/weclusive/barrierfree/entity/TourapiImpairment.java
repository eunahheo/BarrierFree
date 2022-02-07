package com.weclusive.barrierfree.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class TourapiImpairment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ti_seq")
	private long tiSeq;

	@Column(name = "content_id")
	private long contentId;

	@Column(name = "code")
	private String code;

	@Column(name = "ti_overview")
	private String tiOverview;

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
	public TourapiImpairment(Long contentId, String code, String tiOverview, String regDt, String regId, String modDt, String modId) {
		this.contentId = contentId;
		this.code = code;
		this.tiOverview = tiOverview;
		this.regDt = regDt;
		this.regId = regId;
		this.modDt = modDt;
		this.modId = modId;
	}
}
