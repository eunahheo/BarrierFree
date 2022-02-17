package com.weclusive.barrierfree.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.dto.Email;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.UserRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class MailServiceImpl implements MailService {

	private final JavaMailSender mailSender;

	@Autowired
	UserRepository userRepository;

	// 이메일 난수 만드는 메서드
	@Override
	public String generate_key() {
		Random random = new Random();
		StringBuffer sb = new StringBuffer();
		int num = 0;

		do {
			num = random.nextInt(75) + 48;
			if ((num >= 48 && num <= 57) || (num >= 65 && num <= 90) || (num >= 97 && num <= 122)) {
				sb.append((char) num);
			} else {
				continue;
			}

		} while (sb.length() < 10);
		return sb.toString();
	}

	@Async
	@Override
	public void sendMail(Email email) {
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
			messageHelper.setFrom("admin@barrierfree.com");
			messageHelper.setTo(email.getRecipient());
			messageHelper.setSubject(email.getSubject());
			messageHelper.setText(email.getBody(), true);
		};

		try {
			mailSender.send(messagePreparator);
			log.info("이메일 인증 링크를 보냈습니다.");
		} catch (MailException e) {
			log.error(String.valueOf(e));
			e.printStackTrace();
//            throw new CustomException("메일을 여기로 보내는 중 에러 발생 :  " + email.getRecipient());
		}
	}

}
