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

@Entity				// JPA가 관리할 객체 클래스 정의
@NoArgsConstructor	// 기본 생성자 (public PostDto(){})
@AllArgsConstructor // 모든 멤버변수를 받는 생성자
@Getter				// Getter 생성
@Setter				// Setter 생성
@ToString			// toString 생성
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	@Column(name="post_seq")
	private long postSeq;
	
	@Column(name="user_seq")
	private int userSeq;
	
	@Column(name="post_title")
	private String postTitle;
	
	@Column(name="post_content")
	private String postContent;
	
	@Column(name="post_scrap")
	private int postScrap;
	
	@Column(name="post_photo")
	private String postPhoto;
	
//	@Column(name="post_photo_alt")
//	String postPhotoAlt;  // 사진 정보에 대한 설명
	
	@Column(name="post_location")
	private String postLocation;
	
	@Column(name="post_address")
	private String postAddress;
	
	@Column(name="post_lat")
	private String postLat;
	
	@Column(name="post_lng")
	private String postLng;
	
	@Column(name="post_point")
	private int postPoint;
	
	@Column(name="content_id")
	private String contentId;
	
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
	public Post(String postTitle, String postContent, String postLocation, String postAddress,
			String postLat, String postLng, int postPoint, String contentId, String modDt, String modId) {
		super();
		this.postTitle = postTitle;
		this.postContent = postContent;
		this.postLocation = postLocation;
		this.postAddress = postAddress;
		this.postLat = postLat;
		this.postLng = postLng;
		this.postPoint = postPoint;
		this.contentId = contentId;
		this.modDt = modDt;
		this.modId = modId;
	}

	
	
}
