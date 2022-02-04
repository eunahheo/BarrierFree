package com.weclusive.barrierfree.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.TourapiImpairment;

@Repository
public interface TourapiImpairmentRepository extends JpaRepository<TourapiImpairment, Long> {
	
}

