package com.murmuler.organicstack.service;

import com.murmuler.organicstack.dao.MemberDAO;
import com.murmuler.organicstack.vo.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ContactServiceImpl implements ContactService {
    @Autowired
    private MemberDAO memberDAO;

    @Override
    public Map<String, String> getSeller(String memberId) {
        MemberVO memberVO = memberDAO.selectMemberByMemberId(memberId);
        Map<String, String> sellerInfo = new HashMap<String, String>();
        sellerInfo.put("sellerNickname", memberVO.getNickname());
        sellerInfo.put("sellerPhone", memberVO.getPhone());
        return sellerInfo;
    }
}
