package com.weclusive.barrierfree.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.Sido;

@Repository
public interface SidoRepository  extends JpaRepository<Sido, Integer> {
	// 모든 시 조회
	public List<Sido> findAllByDelYn(char delYn);
}
