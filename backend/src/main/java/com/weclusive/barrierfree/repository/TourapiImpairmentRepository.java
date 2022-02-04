package com.weclusive.barrierfree.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.TourapiImpairment;

@Repository
public interface TourapiImpairmentRepository extends JpaRepository<TourapiImpairment, Long> {
	
	public List<TourapiImpairment> findByDelYnAndContentId(char delYn, long contentId);
}

