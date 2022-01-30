package com.weclusive.barrierfree.service;

import com.weclusive.barrierfree.dto.Email;

public interface MailService {

	public String generate_key();

	public void sendMail(Email email);

}
