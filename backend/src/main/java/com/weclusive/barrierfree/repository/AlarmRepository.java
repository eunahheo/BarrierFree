package com.weclusive.barrierfree.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.Alarm;
import com.weclusive.barrierfree.entity.Comment;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long> {

	// 회원의 삭제 안된 알람 유형별 조회
	@Query(value = "SELECT a FROM Alarm a WHERE a.delYn = 'n' AND a.checkYn = 'n' AND a.userSeq = ?1 ORDER BY a.regDt DESC ")
	public List<Alarm> findByAlarmTypeAndUserSeq(int userSeq);
	
	// 회원의 삭제 안된 알림 조회
	@Query(value = "SELECT a FROM Alarm a WHERE a.delYn = 'n' AND a.userSeq = ?1")
	public List<Alarm> findByUserSeq(int userSeq);
	
	// 삭제 안된 알림 조회
	@Query(value = "SELECT a FROM Alarm a WHERE a.delYn = 'n' AND a.alarmSeq = ?1")
	public Optional<Alarm> findByAlarmSeq(long alarmSeq);
	
	// 특정 기간 이후가 지난 알림만 조회 - 14일로
	@Query(value = "SELECT * FROM alarm WHERE reg_dt <= date_add(now(), interval -14 day)", nativeQuery = true)
	public List<Alarm> findOldAlarm();

}
