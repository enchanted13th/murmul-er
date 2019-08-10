package com.murmuler.organicstack.mybatis;

import com.murmuler.organicstack.vo.MemberVO;

import java.util.List;
import java.util.Map;

public interface MemberMapper {
    List<MemberVO> selectAllMembers();
    int deleteMultiMember(MemberVO member);
    MemberVO selectMemberById(String id);
    MemberVO selectMemberByMemberId(String memberId);
    int insertMember(MemberVO member);
    int insertLikeRoom(Map<String, Integer> map);
    List<Integer> selectLikeRoom(Map<String, Integer> map);
    int deleteLikeRoom(Map<String, Integer> map);
    int updateMemberInfoByMemberId(Map<String, String> map);
    int updatePasswordByMemberId(Map<String, String> map);
}
