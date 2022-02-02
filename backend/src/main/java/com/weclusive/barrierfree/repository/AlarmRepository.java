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

	// 삭제 안된 알람 조회
	@Query(value = "SELECT a FROM Alarm a WHERE a.delYn = 'n' AND a.alarmType = ?1 AND a.userSeq = ?2 ")
	public List<Alarm> findByAlarmTypeAndUserSeq(char alarmType, int userSeq);
	
	// 확인 안하고 삭제 안된 알람 조회
	@Query(value = "SELECT a FROM Alarm a WHERE a.delYn = 'n' AND a.checkYn = 'n' AND a.alarmSeq = ?1")
	public Optional<Alarm> findByAlarmSeq(long alarmSeq);

}
