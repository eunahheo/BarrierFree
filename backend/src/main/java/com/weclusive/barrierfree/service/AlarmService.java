package com.weclusive.barrierfree.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.weclusive.barrierfree.entity.Alarm;

public interface AlarmService {

	public List<Map<String, Object>> readAlarm(int userSeq, char type);

	public Optional<Alarm> checkByAlarmSeq(long alarmSeq);
	public Alarm save(Alarm alarm);


}
