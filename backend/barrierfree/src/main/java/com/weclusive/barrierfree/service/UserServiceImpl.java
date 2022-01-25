package com.weclusive.barrierfree.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.sun.mail.util.MailConnectException;
import com.weclusive.barrierfree.entity.Email;
import com.weclusive.barrierfree.entity.Scrap;
import com.weclusive.barrierfree.entity.Token;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.TokenRepository;
import com.weclusive.barrierfree.repository.UserRepository;
import com.weclusive.barrierfree.util.JwtTokenProvider;
import com.weclusive.barrierfree.util.MailContentBuilder;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TokenRepository tokenRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private MailService mailService;

	@Autowired
	private MailContentBuilder mailContentBuilder;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

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

	// 사용자 certKey를 를 포함한 링크를 이메일로 보낸다.
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

	// 사용자 닉네임으로 찾기
	@Override
	public User email_cert_check(String userNickname) {
		User user = userRepository.findByUserNickname(userNickname);
		return user;
	}

	// 이메일 인증이 되면, 사용자 유효 여부를 'n' -> 'y' 업데이트 하기
	@Override
	public void email_certified_update(User user) {
		user.setEnabledYn("y");
		userRepository.save(user);
	}

	// 사용자 로그인 시 비밀번호가 암호화 한 비밀번호와
	// 일치하면 true 리턴
	// 불일치하면 false 리턴
	@Override
	public boolean encodePassword(User loginUser) {
		User user = userRepository.findByUserId(loginUser.getUserId());

		if (!passwordEncoder.matches(loginUser.getUserPwd(), user.getUserPwd()))
			return false;

		return true;
	}

	// refresh token 생성 후 DB에 저장
	@Override
	public void createRefreshToken(User user) {
		String ref_token = jwtTokenProvider.createRefreshToken();
		tokenRepository.save(Token.builder().userSeq(user.getUserSeq()).tokenRefTK(ref_token).build());
	}

	// AccessToken 생성
	@Override
	public String createAccessToken(User user) {
		return jwtTokenProvider.createToken(user.getUserId());

	}

	// refreshToken 재발급
	@Transactional
	public User refreshToken(String token, String refreshToken) {
		// 아직 만료되지 않은 토큰으로는 refresh 할 수 없음
		return null;
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
	
	/**
     * 토큰 재발행
     * @param requestDto
     * @return
     */
//    @Transactional
//    public Token reIssue(Token requestDto) {
//        if (!jwtTokenProvider.validateTokenExpiration(requestDto.getRefreshToken()))
//            throw new InvalidRefreshTokenException();
//
//        User member = findMemberByToken(requestDto);
//
//        if (!member.getRefreshToken().equals(requestDto.getRefreshToken()))
//            throw new InvalidRefreshTokenException();
//
//        String accessToken = jwtTokenProvider.createToken(member.getEmail());
//        String refreshToken = jwtTokenProvider.createRefreshToken();
//        member.updateRefreshToken(refreshToken);
//        return new TokenResponseDto(accessToken, refreshToken);
//    }
//
//    public User findMemberByToken(Token requestDto) {
//        Authentication auth = jwtTokenProvider.getAuthentication(requestDto.getAccessToken());
//        User userDetails = (User) auth.getPrincipal();
//        String userId = userDetails.getUserId();
//        return userRepository.findByUserId(userId).orElseThrow(MemberNotFoundException::new);
//    }

}
