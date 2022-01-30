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

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Alarm {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	@Column(name="alarm_seq")
	private long alarmSeq;
	
	@Column(name="user_seq")
	private int userSeq;
	
	@Column(name="alarm_type")
	private char alarmType;
	
	@Column(name="alarm_data")
	private long alarmData;
	
	@Column(name="check_yn")
	private char checkYn = 'n';
	
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
	public Alarm(int userSeq, char alarmType, long alarmData, String regDt, String regId,
			String modDt, String modId) {
		super();
		this.userSeq = userSeq;
		this.alarmType = alarmType;
		this.alarmData = alarmData;
		this.regDt = regDt;
		this.regId = regId;
		this.modDt = modDt;
		this.modId = modId;
	}
	
	
}
