package com.weclusive.barrierfree.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.Token;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {

	Token findByUserSeq(int userSeq);


}
