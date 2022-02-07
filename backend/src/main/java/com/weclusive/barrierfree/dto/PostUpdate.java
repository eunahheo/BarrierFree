package com.weclusive.barrierfree.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class PostUpdate {
	private int userSeq;

	private String postTitle;

	private String postContent;
	
	private String postLocation;

	private String postAddress;

	private String postLat;

	private String postLng;

	private int postPoint;

	private String contentId;

}
