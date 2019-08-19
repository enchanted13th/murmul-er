package com.murmuler.organicstack.service;

import com.murmuler.organicstack.vo.MemberVO;

import java.util.List;
import java.util.Map;

public interface MemberService {
    List<MemberVO> getAllMembers();
    int removeMultiMember(MemberVO member);
    MemberVO login(String id, String pwd);
    boolean isDuplicatedId(String id);
    int join(MemberVO member);
    int changeMemberInfo(int memberId, String realname, String nickname, String email, String phone);
    boolean changePassword(int memberId, String newpwd);
    MemberVO getMemberById(String memberId);
}