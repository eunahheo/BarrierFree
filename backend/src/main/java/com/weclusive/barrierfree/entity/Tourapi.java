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
public class Tourapi {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "tourapi_seq")
	private long tourapiSeq;

	@Column(name = "content_id")
	private long contentId;

	@Column(name = "tourapi_contenttypeid")
	private String tourapiContentTypeId;

	@Column(name = "tourapi_title")
	private String tourapiTitle;

	@Column(name = "sido_code")
	private String sidoCode;

	@Column(name = "sigungu_code")
	private String sigunguCode;

	@Column(name = "tourapi_addr1")
	private String tourapiAddr1;

	@Column(name = "tourapi_addr2")
	private String tourapiAddr2;

	@Column(name = "tourapi_zipcode")
	private String tourapiZipcode;

	@Column(name = "tourapi_lat")
	private String tourapiLat;

	@Column(name = "tourapi_lng")
	private String tourapiLng;

	@Column(name = "tourapi_tel")
	private String tourapiTel;
	
	@Column(name = "tourapi_image")
	private String tourapiImage;
	
	@Column(name = "tourapi_overview")
	private String tourapiOverview;
	
	@Column(name = "tourapi_homepage")
	private String tourapiHomepage;

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
