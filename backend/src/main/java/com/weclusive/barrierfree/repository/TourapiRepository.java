package com.weclusive.barrierfree.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.Tourapi;

@Repository
public interface TourapiRepository extends JpaRepository<Tourapi, Long> {
//	@Query(value = "SELECT t FROM Tourapi t WHERE t.tourapi_contenttypeid = :contenttypeid AND t.tourapi_title LIKE ")
	public Page<Tourapi> findByTourapiTitleContainingAndTourapiContenttypeid(String keyword, String contenttypeid,
			Pageable pageable);

}
