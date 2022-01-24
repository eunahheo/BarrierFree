package com.weclusive.barrierfree.dto;

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

@Entity				// JPA가 관리할 객체 클래스 정의
@NoArgsConstructor	// 기본 생성자 (public PostDto(){})
@AllArgsConstructor // 모든 멤버변수를 받는 생성자
@Getter				// Getter 생성
@Setter				// Setter 생성
@ToString			// toString 생성
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	@Column(name="post_no")
	long postNo;
	@Column(name="user_seq")
	int userSeq;
	@Column(name="post_title")
	String postTitle;
	@Column(name="post_content")
	String postContent;
	@Column(name="post_scrap")
	int postScrap;
	@Column(name="post_photo")
	String postPhoto;
//	@Column(name="post_photo_alt")
//	String postPhotoAlt;  // 사진 정보에 대한 설명
	@Column(name="post_location")
	String postLocation;
	@Column(name="post_address")
	String postAddress;
	@Column(name="post_lat")
	String postLat;
	@Column(name="post_lng")
	String postLng;
	@Column(name="post_point")
	int postPoint;
	@Column(name="content_id")
	String contentId;
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
