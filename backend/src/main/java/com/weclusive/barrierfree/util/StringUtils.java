package com.weclusive.barrierfree.util;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class StringUtils {

	// 빈 문자열이거나 whitespace가 담긴 문자열에 대한 처리
	public static boolean isBlank(final CharSequence cs) {
		int strLen;
		if (cs == null || (strLen = cs.length()) == 0) {
			return true;
		}
		for (int i = 0; i < strLen; i++) {
			if (!Character.isWhitespace(cs.charAt(i))) {
				return false;
			}
		}
		return true;
	}

	public static boolean isNotBlank(final CharSequence cs) {
		return !isBlank(cs);
	}

	public static String idString(String userId) {
		StringBuilder sb = new StringBuilder(userId);
		for (int i = 4; i < userId.length(); i++) {
			sb.setCharAt(i, '*');
		}
		return sb.toString();

	}
	
	// 임시 비밀번호 생성
	public static String getRamdomPassword(int size) {
	    char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
	            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a',
	            'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
	            'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&' ,'*'};
	    StringBuffer sb = new StringBuffer();
	    SecureRandom sr = new SecureRandom();
	    sr.setSeed(new Date().getTime());
	    int idx = 0;
	    int len = charSet.length;
	    for (int i = 0; i < size; i++) {
	        idx = sr.nextInt(len);
	        sb.append(charSet[idx]);
		}
		return sb.toString();
	}
	
	// 현재 시간
	public static String now() {
		// 현재 날짜와 시간
		LocalDate date = LocalDate.now(); // yyyy-mm-dd
		LocalTime time = LocalTime.now(); // HH:mm:ss.sssss

		// 포맷 정의하기
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
		// 포맷 적용하기
		String now = date + " " + time.format(formatter);

		return now;
	}
}

/*
 * StringUtils.isNotBlank(null) = false StringUtils.isNotBlank("") = false
 * StringUtils.isNotBlank(" ") = false StringUtils.isNotBlank("test") = true
 * StringUtils.isNotBlank("  test  ") = true
 */
