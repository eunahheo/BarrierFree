package com.weclusive.barrierfree.entity;

import java.util.Collection;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "user")
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 파라미터가 없는 기본 생성자를 생성한다.
@Getter
@Setter
@ToString
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
	private String userPhoto;

	@Column(name = "user_role")
	private String userRole = "0";

	@Column(name = "del_yn")
	private String delYn = "n"; // 'y', 'n'

	@Column(name = "reg_dt")
	private String regDt;

	@Column(name = "reg_id")
	private String regId;

	@Column(name = "mod_dt")
	private String modDt;

	@Column(name = "mod_id")
	private String modId;

	@Column(name = "enabled_yn")
	private String enabledYn;

	@Column(name = "cert_key")
	private String certKey;

	@Builder
	public User(String user_id, String user_nickname, String user_pwd, String user_email, String user_photo,
			String user_role, String del_yn, String reg_dt, String reg_id, String mod_dt, String mod_id) {
		super();
		this.userId = user_id;
		this.userNickname = user_nickname;
		this.userPwd = user_pwd;
		this.userEmail = user_email;
		this.userPhoto = user_photo;
		this.userRole = user_role;
		this.delYn = del_yn;
		this.regDt = reg_dt;
		this.regId = reg_id;
		this.modDt = mod_dt;
		this.modId = mod_id;
	}

}
