package com.weclusive.barrierfree.dto;

import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class PostSave {
	@Column(name="user_seq")
	private int userSeq;
	
	@Column(name="post_title")
	private String postTitle;
	
	@Column(name="post_content")
	private String postContent;
	
	@Column(name="post_photo")
	private String postPhoto;
	
	@Column(name="post_alt")
	private String postAlt = null;  // 사진 정보에 대한 설명
	
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
	
	private int physical;
	private int visibility;
	private int deaf;
	private int infant;
	private int senior;
}
