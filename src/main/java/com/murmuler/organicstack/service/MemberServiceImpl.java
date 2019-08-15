package com.murmuler.organicstack.service;

import com.murmuler.organicstack.dao.MemberDAO;
import com.murmuler.organicstack.vo.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    private MemberDAO dao;

    public List<MemberVO> getAllMembers(){
        return dao.selectAllMembers();
    }

    public int removeMultiMember(MemberVO member){
        return dao.deleteMultiMember(member);
    }

    public MemberVO login(String id, String pwd) {
        MemberVO member = dao.selectMemberById(id);
        if(member != null){
            if(!pwd.equals(member.getPwd())){
                member.setMemberId(-1);
            }
            return member;
        } else {
            return null;
        }
    }

    @Override
    public boolean isDuplicatedId(String id) {
        if(id == null || id.equals("")) return false;
        if(dao.selectMemberById(id) == null) return false;
        else return true;
    }

    @Override
    public int join(MemberVO member) {
        if(member == null) return 0;
        return dao.insertMember(member);
    }

    @Override
    public int changeMemberInfo(int memberId, String realname, String nickname, String email, String phone) {
        if (memberId <= 0) return -1;
        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("memberId", memberId+"");
        paramMap.put("realname", realname);
        paramMap.put("nickname", nickname);
        paramMap.put("email", email);
        paramMap.put("phone", phone);
        return dao.updateMemberInfoByMemberId(paramMap);
    }

    @Override
    public boolean changePassword(int memberId, String newPwd) {
        if(memberId <= 0) return false;
        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("memberId", memberId+"");
        paramMap.put("newPwd", newPwd);
        return dao.updatePasswordByMemberId(paramMap) > 0;
    }

    @Override
    public MemberVO getMemberById(String memberId) {
        return dao.selectMemberByMemberId(memberId);
    }

}
