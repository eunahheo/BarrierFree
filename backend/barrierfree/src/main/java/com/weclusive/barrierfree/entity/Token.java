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
@Getter
@Setter
@ToString
public class Token {
	@Id
	@Column(name = "user_seq")
	private int userSeq;

	@Column(name = "token_ref_tk")
	private String tokenRefTK;

	@Builder
	public Token(int userSeq, String tokenRefTK) {
		super();
		this.userSeq = userSeq;
		this.tokenRefTK = tokenRefTK;
	}

}
