package com.murmuler.organicstack.service;

import com.murmuler.organicstack.dao.MemberDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TalkServiceImpl implements TalkService {
    @Autowired
    MemberDAO memberDAO;

    public String getNickname(int memberId) {
        return memberDAO.selectMemberByMemberId(memberId+"").getNickname();
    }

    @Override
    public void addFilePath(String path) {

    }

}
