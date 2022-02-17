package com.weclusive.barrierfree.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "user")
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 파라미터가 없는 기본 생성자를 생성한다. 접근 권한을 설정하여 어느 곳에서나 객체를 생성할 수 있는 상황을 막는다.
@Getter
@Setter
@ToString
@AllArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // PK, Auto_Increment로 설정해서 직접 할당 방식이 아니라, 자동으로 생성되도록 하기 위한
														// 어노테이션
	@Column(name = "user_seq")
	private int userSeq;

	@Column(name = "user_id")
	private String userId;

	@Column(name = "user_nickname")
	private String userNickname;

	@Column(name = "user_pwd")
	private String userPwd;

	@Column(name = "user_email")
	private String userEmail;

	@Column(name = "user_photo")
	private String userPhoto = "/images/20220217_1c47e3d9-0ac1-4e0d-acea-e0d134bce994_basic_profile.jpg";

	@Column(name = "user_role")
	private char userRole = '0';

	@Column(name = "del_yn")
	private char delYn = 'n';

	@Column(name = "reg_dt")
	private String regDt;

	@Column(name = "reg_id")
	private String regId;

	@Column(name = "mod_dt")
	private String modDt;

	@Column(name = "mod_id")
	private String modId;

	@Column(name = "enabled_yn")
	private char enabledYn;

	@Column(name = "cert_key")
	private String certKey;

	@Builder
	public User(String userId, String userNickname, String userPwd, String userEmail, String regDt, String regId,
			String modDt, String modId, char enabledYn, String certKey) {
		super();
		this.userId = userId;
		this.userNickname = userNickname;
		this.userPwd = userPwd;
		this.userEmail = userEmail;
		this.regDt = regDt;
		this.regId = regId;
		this.modDt = modDt;
		this.modId = modId;
		this.enabledYn = enabledYn;
		this.certKey = certKey;
	}

}
