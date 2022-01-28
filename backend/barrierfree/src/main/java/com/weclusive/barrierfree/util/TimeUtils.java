package com.weclusive.barrierfree.util;

import java.time.LocalDateTime;

public class TimeUtils {

	// 현재 시간 구하기
	public static String curTime() {
		return LocalDateTime.now().toString().replace("T", " ").substring(0, 19);
	}
}
