package com.weclusive.barrierfree.util;

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

}

/*
 	StringUtils.isNotBlank(null)       = false
	StringUtils.isNotBlank("")         = false
	StringUtils.isNotBlank(" ")        = false
	StringUtils.isNotBlank("test")     = true
	StringUtils.isNotBlank("  test  ") = true
 */
 