package com.weclusive.barrierfree.service;

import com.weclusive.barrierfree.entity.Email;

public interface MailService {

	public String generate_key();

	public void sendMail(Email email);

}
