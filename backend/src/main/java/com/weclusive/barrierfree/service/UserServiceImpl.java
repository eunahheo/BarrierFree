package com.weclusive.barrierfree.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.dto.Email;
import com.weclusive.barrierfree.dto.Impairment;
import com.weclusive.barrierfree.dto.UserJoin;
import com.weclusive.barrierfree.dto.UserJoinKakao;
import com.weclusive.barrierfree.dto.UserLoginDto;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.entity.UserImpairment;
import com.weclusive.barrierfree.repository.TokenRepository;
import com.weclusive.barrierfree.repository.UserImpairmentRepository;
import com.weclusive.barrierfree.repository.UserRepository;
import com.weclusive.barrierfree.util.JwtUtil;
import com.weclusive.barrierfree.util.MailContentBuilder;
import com.weclusive.barrierfree.util.StringUtils;
import com.weclusive.barrierfree.util.TimeUtils;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserImpairmentRepository userImpairmentRepository;

	@Autowired
	private TokenRepository tokenRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private MailServiceImpl mailService;

	@Autowired
	private MailContentBuilder mailContentBuilder;
 
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	// 회원 등록
	@Override
	public void registUser(UserJoin userJoin) {
		String now = TimeUtils.curTime(); // 현재 시각
		userRepository.save(
				User.builder()
				.userId(userJoin.getUserId())
				.userNickname(userJoin.getUserNickname())
				.userEmail(userJoin.getUserEmail())
				.userPwd(passwordEncoder.encode(userJoin.getUserPwd())) // 비밀번호 암호화
				.regDt(now).regId(userJoin.getUserId())
				.modDt(now).modId(userJoin.getUserId())
				.enabledYn('n')
				.certKey(mailService.generate_key()) // 사용자 메일 인증 키
				.build());

		User user = findByUserId(userJoin.getUserId());
		String userId = user.getUserId();
		int userSeq = user.getUserSeq();

		if (userJoin.getPhysical() == 1) { // 지체장애
			saveImpairment(userSeq, userId, "physical", now);
		}
		if (userJoin.getVisibility() == 1) { // 시각장애
			saveImpairment(userSeq, userId, "visibility", now);
		}
		if (userJoin.getDeaf() == 1) { // 청각장애
			saveImpairment(userSeq, userId, "deaf", now);
		}
		if (userJoin.getInfant() == 1) { // 영유아가족
			saveImpairment(userSeq, userId, "infant", now);
		}
		if (userJoin.getSenior() == 1) { // 고령자
			saveImpairment(userSeq, userId, "senior", now);
		}
	}

	// 카카오 회원 등록
	@Override
	public void registKakaoUser(UserJoinKakao userJoinKakao, String userEmail) {
		String now = TimeUtils.curTime(); // 현재 시각

		userRepository.save(
				User.builder()
				.userId(userJoinKakao.getUserId())
				.userEmail(userEmail)
				.userNickname(userJoinKakao.getUserNickname())
				.userPwd(passwordEncoder.encode(userEmail)) // 비밀번호 암호화
				.regDt(now).regId(userJoinKakao.getUserId())
				.modDt(now).modId(userJoinKakao.getUserId())
				.certKey(null)
				.enabledYn('y') // 카카오 회원의 경우 이메일 인증 패스
				.build());

		User user = findByUserId(userJoinKakao.getUserId());
		String userId = user.getUserId();
		int userSeq = user.getUserSeq();

		if (userJoinKakao.getPhysical() == 1) { // 지체장애
			saveImpairment(userSeq, userId, "physical", now);
		}
		if (userJoinKakao.getVisibility() == 1) { // 시각장애
			saveImpairment(userSeq, userId, "visibility", now);
		}
		if (userJoinKakao.getDeaf() == 1) { // 청각장애
			saveImpairment(userSeq, userId, "deaf", now);
		}
		if (userJoinKakao.getInfant() == 1) { // 영유아가족
			saveImpairment(userSeq, userId, "infant", now);
		}
		if (userJoinKakao.getSenior() == 1) { // 고령자
			saveImpairment(userSeq, userId, "senior", now);
		}

	}

	// 사용자 certKey를 를 포함한 링크를 이메일로 보낸다.
	@Override
	public void sendEmailwithUserKey(String email, String id) {
		User user = userRepository.findByUserId(id);
		String link = "https://barrierfree_url/user/email/certified?userNickname=" + user.getUserNickname()
				+ "&certified=" + user.getCertKey();
		String message = mailContentBuilder.build(link);
		try {
			mailService.sendMail(new Email(email, id, "[BarrierFree] 이메일 인증", message));
		} catch (MailException e) {
			e.printStackTrace();
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
		user.setEnabledYn('y');
		userRepository.save(user);
	}

	// 사용자 로그인 시 비밀번호가 암호화 한 비밀번호와
	// 일치하면 true 리턴
	// 불일치하면 false 리턴
	@Override
	public boolean encodePassword(UserLoginDto loginUser) {
		User user = userRepository.findByUserId(loginUser.getUserId());

		if (!passwordEncoder.matches(loginUser.getUserPwd(), user.getUserPwd()))
			return false;

		return true;
	}

//	// refresh token 생성 후 DB에 저장
//	@Override
//	public String createRefreshToken(User user) {
//		String ref_token = jwtUtil.generateRefreshToken((user.getUserId()));
//		tokenRepository.save(Token.builder().userSeq(user.getUserSeq()).tokenRefTK(ref_token).build());
//		return ref_token;
//	}

	// AccessToken 생성
	@Override
	public String createAccessToken(User user) {
		try {
			authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(user.getUserId(), user.getUserPwd()));
		} catch (Exception e) {
			System.out.println(e.getMessage()); 
		}
		return jwtUtil.generateAccessToken(user.getUserId());		
	}

	// refreshToken 재발급
	@Transactional
	public User refreshToken(String token, String refreshToken) {
		// 아직 만료되지 않은 토큰으로는 refresh 할 수 없음
		return null;
	}

	// 카카오 코드로 access token 받기
	@Override
	public String getKakaoAccessToken(String code) throws Exception {
		String access_Token = "";
		String reqURL = "https://kauth.kakao.com/oauth/token";

		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			// POST 요청을 위해 기본값이 false인 setDoOutput을 true로
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);

			// POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			StringBuilder sb = new StringBuilder();
			sb.append("grant_type=authorization_code");
			sb.append("&client_id=fa3c898eec92948b420f6f03b934acd1"); // REST_API_KEY 입력
			sb.append("&redirect_uri=https://barrierfree_url/kakaologinpage"); // 인가코드 받은 redirect_uri 입력
			sb.append("&code=" + code);
			bw.write(sb.toString());
			bw.flush();

			// 결과 코드가 200이라면 성공
			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);

			// 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}
			// Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
			JSONParser parser = new JSONParser();
			JSONObject element = (JSONObject) parser.parse(result);

			access_Token = element.get("access_token").toString();

			br.close();
			bw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return access_Token;
	}

	// 카카오 토큰으로 사용자 정보 받기
	@Override
	public String getKakaoEmail(String token) throws Exception {

		String reqURL = "https://kapi.kakao.com/v2/user/me";

		// access_token을 이용하여 사용자 정보 조회
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			conn.setRequestProperty("Authorization", "Bearer " + token); // 전송할 header 작성, access_token전송

			// 결과 코드가 200이라면 성공
			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);

			// 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}

			// Gson 라이브러리로 JSON파싱
			JSONParser parser = new JSONParser();
			JSONObject element = (JSONObject) parser.parse(result);
			JSONObject kakao_account = (JSONObject) element.get("kakao_account");
			
			boolean hasEmail = (boolean) kakao_account.get("has_email");
			String email = "";
			if (hasEmail) {
				email = kakao_account.get("email").toString();
			}

			br.close();

			return email;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
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

	// 이메일로 회원 찾기 - kakao
	@Override
	public User findByUserEmail(String userEmail) {
		User user = userRepository.findByUserEmail(userEmail);
		return user;
	}


	public void saveImpairment(int userSeq, String userId, String code, String now) {
		userImpairmentRepository.save(UserImpairment.builder().userSeq(userSeq).code(code).delYn('n').regDt(now)
				.regId(userId).modDt(now).modId(userId).build());
	}

	// 임시 비밀번호 발급, 이메일 전송
	@Override
	public void sendEmailwithTemp(String userEmail, String userId) {
		String tempPass = StringUtils.getRamdomPassword(10);
		String mail = mailContentBuilder.passBuild(tempPass);
		System.out.println("호출");
		try {
			mailService.sendMail(new Email(userEmail, userId, "[BarrierFree] 임시 비밀번호 발급", mail));
			User user = userRepository.findByUserId(userId);
			user.setUserPwd(passwordEncoder.encode(tempPass));
			userRepository.save(user);
		} catch (MailException e) {
			e.printStackTrace();
		}

	}

	// 회원의 장애 정보 가져오기
	@Override
	public Impairment readUserImpairment(int userSeq) {
		int returnUserSeq = userRepository.countByDelYnAndUserSeq('n', userSeq);

		if (returnUserSeq != 0) {

			Impairment ui = new Impairment();
			List<String> st = userImpairmentRepository.findImpairment(userSeq);

			for (int i = 0; i < st.size(); i++) { // 장애 정보 수 만큼 반복
				String im = st.get(i);

				switch (im) {
				case "physical":
					ui.setPhysical(1);
					break;
				case "visibility":
					ui.setVisibility(1);
					break;
				case "deaf":
					ui.setDeaf(1);
					break;
				case "infant":
					ui.setInfant(1);
					break;
				case "senior":
					ui.setSenior(1);
					break;
				}
			}
			return ui;
		}
		return null;
	}

	@Override
	public User findByUserSeq(int userSeq) {
		User user = userRepository.findByUserSeq(userSeq);
		return user;
	}

	@Override
	public Map<String, Object> userInfo(String userId) {
		
		Map<String, Object> userinfo = new HashMap<>();
		User user = userRepository.findByUserId(userId);

		if(user != null) {
			userinfo.put("userId", user.getUserId());
			userinfo.put("userNickname", user.getUserNickname());
			userinfo.put("userSeq", user.getUserSeq());
			userinfo.put("userPhoto", user.getUserPhoto());
			userinfo.put("userEmail", user.getUserEmail());
			userinfo.put("impairment", userImpairmentRepository.findImpairment(user.getUserSeq()));
		}
		return userinfo;
	}
	
	@Override
	public boolean modifyUser(User user) throws Exception{
		try {
			User newUser = userRepository.findByUserSeq(user.getUserSeq());
			if(user.getUserNickname()!=null) newUser.setUserNickname(user.getUserNickname());
			if(user.getUserPwd()!=null)  newUser.setUserPwd(passwordEncoder.encode(user.getUserPwd()));
			if(user.getUserPhoto()!=null) newUser.setUserPhoto(user.getUserPhoto());
			newUser.setModDt(TimeUtils.curTime());
			newUser.setModId(userRepository.findByUserSeq(user.getUserSeq()).getUserId());
			
			userRepository.save(newUser);
			return true;
		} catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean withdrawUser(int userSeq) throws Exception {
		try {
			User newUser = userRepository.findByUserSeq(userSeq);
			newUser.setDelYn('y');
			newUser.setModDt(TimeUtils.curTime());
			newUser.setModId(userRepository.findByUserSeq(userSeq).getUserId());
			
			userRepository.save(newUser);
			return true;
		} catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public void logoutUser(String accessToken) {
		String userId = jwtUtil.extractUserId(accessToken);
		int userSeq = userRepository.findByUserId(userId).getUserSeq();
		tokenRepository.deleteByUserSeq(userSeq); // 해당 리프레시 토큰 삭제
	}

	@Override
	public int updateUserImpairmentByUserSeq(int userSeq, Impairment impairment) throws Exception {
		// 입력한 게시글 번호의 모든 장애 정보 반환(del_yn = n)
		List<UserImpairment> curImpairment = userImpairmentRepository.findByDelYnAndUserSeq('n', userSeq);
		int res = 0;
		// 입력된 장애 정보 저장하는 배열
		// -1) 선택 X, 1) 선택
		// physical, visibility, deaf, infant, senior
		int check[] = new int[] { -1, -1, -1, -1, -1 };

		for (int i = 0; i < curImpairment.size(); i++) { // 원래 게시글의 장애 정보 수 만큼 반복
			String im = curImpairment.get(i).getCode(); // 게시글의 장애 코드 ex) physical

			// 선택된 상태면 check를 1로
			switch (im) {
			case "physical":
				check[0] = 1;
				break;
			case "visibility":
				check[1] = 1;
				break;
			case "deaf":
				check[2] = 1;
				break;
			case "infant":
				check[3] = 1;
				break;
			case "senior":
				check[4] = 1;
				break;
			}
		}

		// check : 원래 선택 여부(-1) -> impairment : 새로 선택 여부(1)
		// 취소 -> 선택 : post_code table에 추가하기
		if (check[0] == -1 && impairment.getPhysical() == 1) {
			saveImpairment(0, userSeq);
			res = 1;
		}
		if (check[1] == -1 && impairment.getVisibility() == 1) {
			saveImpairment(1, userSeq);
			res = 1;
		}
		if (check[2] == -1 && impairment.getDeaf() == 1) {
			saveImpairment(2, userSeq);
			res = 1;
		}
		if (check[3] == -1 && impairment.getInfant() == 1) {
			saveImpairment(3, userSeq);
			res = 1;
		}
		if (check[4] == -1 && impairment.getSenior() == 1) {
			saveImpairment(4, userSeq);
			res = 1;
		}

		// check : 원래 선택 여부(1) -> impairment : 새로 선택 여부(0)
		// 선택 -> 취소 : post_code에서 삭제하기 del_yn = y
		if (check[0] == 1 && impairment.getPhysical() == 0) {
			updateImpairment(0, userSeq);
			res = 1;
		}
		if (check[1] == 1 && impairment.getVisibility() == 0) {
			updateImpairment(1, userSeq);
			res = 1;
		}
		if (check[2] == 1 && impairment.getDeaf() == 0) {
			updateImpairment(2, userSeq);
			res = 1;
		}
		if (check[3] == 1 && impairment.getInfant() == 0) {
			updateImpairment(3, userSeq);
			res = 1;
		}
		if (check[4] == 1 && impairment.getSenior() == 0) {
			updateImpairment(4, userSeq);
			res = 1;
		}

		return res;
	}
	
	// 사용자 장애정보 저장하기
		public void saveImpairment(int im, int userSeq) {
			String curTime = TimeUtils.curTime();
			String type = "";
			switch (im) {
			case 0:
				type = "physical";
				break;
			case 1:
				type = "visibility";
				break;
			case 2:
				type = "deaf";
				break;
			case 3:
				type = "infant";
				break;
			case 4:
				type = "senior";
				break;
			}

			userImpairmentRepository.save(UserImpairment.builder()
					.userSeq(userSeq)
					.code(type)
					.delYn('n')
					.regDt(curTime)
					.regId(returnUserId(userSeq))
					.modDt(curTime)
					.modId(returnUserId(userSeq)).build());
	}
		
	// userSeq -> userId
	public String returnUserId(int userSeq) {
		Optional<User> list = userRepository.findById(userSeq);
		String userId = list.get().getUserId();
		return userId;
	}
	
	public void updateImpairment(int im, int userSeq) {
		String curTime = TimeUtils.curTime();
		String type = "";
		switch (im) {
		case 0:
			type = "physical";
			break;
		case 1:
			type = "visibility";
			break;
		case 2:
			type = "deaf";
			break;
		case 3:
			type = "infant";
			break;
		case 4:
			type = "senior";
			break;
		}

		Optional<UserImpairment> ui = userImpairmentRepository.findOneByUserSeqCode(userSeq, type);
		ui.get().setDelYn('y');
		ui.get().setModDt(curTime);
		ui.get().setModId(returnUserId(userSeq));
		save(ui.get());
	}
	
	// 사용자 장애정보 저장하기
	public UserImpairment save(UserImpairment userImpairment) {
		userImpairmentRepository.save(userImpairment);
		return userImpairment;
	}
}
