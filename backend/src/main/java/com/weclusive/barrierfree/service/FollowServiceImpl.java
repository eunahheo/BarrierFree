package com.weclusive.barrierfree.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.dto.FollowDto;
import com.weclusive.barrierfree.entity.Follow;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.FollowRepository;
import com.weclusive.barrierfree.repository.UserRepository;
import com.weclusive.barrierfree.util.StringUtils;

@Service
public class FollowServiceImpl implements FollowService {

	@Autowired
	private FollowRepository followRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public void follow(FollowDto followDto) {
		String now = StringUtils.now();
		User user = userRepository.findByUserSeq(followDto.getUserSeq());

		followRepository.save(
				Follow.builder()
				.userSeq(followDto.getUserSeq())
				.followingSeq(followDto.getFollowingSeq())
				.delYn('n')
				.regDt(now).regId(user.getUserId())
				.modDt(now).modId(user.getUserId())
				.build());
	}

	@Override
	public void unfollow(FollowDto followDto) {
		String now = StringUtils.now();
		User user = userRepository.findByUserSeq(followDto.getUserSeq());
		Follow follow = followRepository.findByUserSeqAndFollowingSeqAndDelYn(followDto.getUserSeq(),
				followDto.getFollowingSeq(), 'n');
		follow.setDelYn('y');
		follow.setModDt(now);
		follow.setModId(user.getUserId());
		followRepository.save(follow);
	}

}
