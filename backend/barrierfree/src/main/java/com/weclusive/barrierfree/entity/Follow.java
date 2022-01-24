package com.weclusive.barrierfree.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Follow {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	@Column(name="follow_seq")
	long followSeq;
	@Column(name="user_seq")
	int userSeq;
	@Column(name="following_seq")
	int followingSeq;
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
