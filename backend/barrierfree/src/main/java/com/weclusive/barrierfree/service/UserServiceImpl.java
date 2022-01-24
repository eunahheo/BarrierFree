package com.weclusive.barrierfree.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.sun.mail.util.MailConnectException;
import com.weclusive.barrierfree.entity.Email;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.UserRepository;
import com.weclusive.barrierfree.util.MailContentBuilder;

@Service
public class UserServiceImpl implements UserService {
 

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private MailService mailService;

	@Autowired
	private MailContentBuilder mailContentBuilder;

//	@Override
//	public List<User> allUsers() {
//		return userDao.selectUser();
//	}

	// 회원 등록
	@Override
	public void registUser(User user) {
		// 비밀번호 암호화
		user.setUserPwd(passwordEncoder.encode(user.getUserPwd()));

		user.setRegDt(now());
		user.setRegId(user.getUserId());
		user.setModDt(now());
		user.setModId(user.getUserId());
		user.setEnabledYn("n");
		user.setCertKey(mailService.gererate_key());
		userRepository.save(user);

	}

	@Override
	public void sendEmailwithUserKey(String email, String id) {
//		String token = generateVerificationToken(user);
		User user = userRepository.findByUserId(id);
//		String link = "http://localhost:8080/user/email/certified?&certified=" + user.getCertKey();
		String link = "http://localhost:8080/user/email/certified?userNickname=" + user.getUserNickname()
				+ "&certified=" + user.getCertKey();
		String message = mailContentBuilder.build(link);

		try {
			mailService.sendMail(new Email(email, id, "[BarrierFree] 이메일 인증", message));
		} catch (MailException e) {
			e.printStackTrace();
//            throw new CustomException("메일을 여기로 보내는 중 에러 발생 :  " + email.getRecipient());
		}
	}

	@Override
	public User email_cert_check(String userNickname) {
		User user = userRepository.findByUserNickname(userNickname);
		return user;
	}

	@Override
	public void email_certified_update(User user) {
		user.setEnabledYn("y");
		userRepository.save(user);
	}

	// 현재 시간
	public String now() {
		// 현재 날짜와 시간
		LocalDate date = LocalDate.now(); // yyyy-mm-dd
		LocalTime time = LocalTime.now(); // HH:mm:ss.sssss

		// 포맷 정의하기
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
		// 포맷 적용하기
		String now = date + " " + time.format(formatter);

		return now;
	}

	// 아이디로 회원 찾기 - 중복 확인
	@Override
	public User findByUserId(String userId) {
		User user = userRepository.findByUserId(userId);
		return user;
	}

	// 닉네임으로 회원 찾기 - 중복 확인
	@Override
	public User findByUserNickname(String userNickname) {
		User user = userRepository.findByUserNickname(userNickname);
		return user;

	}

}
