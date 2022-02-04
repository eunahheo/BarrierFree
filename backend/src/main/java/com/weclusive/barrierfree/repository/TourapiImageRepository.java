package com.weclusive.barrierfree.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.TourapiImage;

@Repository
public interface TourapiImageRepository extends JpaRepository<TourapiImage, Long> {
	
}

