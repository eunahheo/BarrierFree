package com.weclusive.barrierfree.entity;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Service
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class Email {
	private String recipient;
	private String recipient_id;
	private String subject;
	private String body;

}
