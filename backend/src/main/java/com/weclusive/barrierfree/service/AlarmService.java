package com.weclusive.barrierfree.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.weclusive.barrierfree.entity.Alarm;

public interface AlarmService {

	public List<Map<String, Object>> readAlarm(int userSeq, char type);

	public Alarm save(Alarm alarm);

	public Optional<Alarm> updateByAlarmSeq(long alarmSeq, int type);

	public int deleteOldAlarm(int userSeq);

	public int saveAlaram(int userSeq, char type, long data);


}
