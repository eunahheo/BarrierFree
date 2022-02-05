package com.weclusive.barrierfree.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserJoin {
	private String userId;
	private String userNickname;
	private String userPwd;
	private String userEmail;
	private int physical;
	private int visibility;
	private int deaf;
	private int infant;
	private int senior;
}
