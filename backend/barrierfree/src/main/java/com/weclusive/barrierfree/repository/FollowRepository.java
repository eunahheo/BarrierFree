package com.weclusive.barrierfree.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.weclusive.barrierfree.entity.Follow;

public interface FollowRepository extends JpaRepository<Follow, Long> {
	
	@Query(value="SELECT followingSeq FROM Follow WHERE userSeq=?1")
	public List<Long> findFollower(int userSeq);
}
