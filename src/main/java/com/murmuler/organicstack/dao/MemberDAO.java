package com.murmuler.organicstack.dao;

import com.murmuler.organicstack.vo.MemberVO;

import java.util.List;
import java.util.Map;

public interface MemberDAO {
    List<MemberVO> selectAllMembers();
    MemberVO selectMemberById(String id);
    MemberVO selectMemberByMemberId(String memberId);
    int insertMember(MemberVO member);
    int deleteMultiMember(MemberVO member);
    int insertLikeRoom(Map<String, Integer> map);
    List<Integer> selectLikeRoom(Map<String, Integer> map);
    int deleteLikeRoom(Map<String, Integer> map);
    int updateMemberInfoByMemberId(Map<String, String> map);
    int updatePasswordByMemberId(Map<String, String> map);
}
