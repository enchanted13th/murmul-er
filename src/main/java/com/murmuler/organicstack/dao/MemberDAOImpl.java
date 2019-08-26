package com.murmuler.organicstack.dao;

import com.murmuler.organicstack.mybatis.MemberMapper;
import com.murmuler.organicstack.vo.MemberVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Member;
import java.util.List;
import java.util.Map;

@Repository
public class MemberDAOImpl implements MemberDAO {
    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<MemberVO> selectAllMembers() {
        MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
        List<MemberVO> list = mapper.selectAllMembers();
        return list;
    }

    @Override
    public MemberVO selectMemberById(String id) {
        MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
        MemberVO member = mapper.selectMemberById(id);
        return member;
    }

    @Override
    public MemberVO selectMemberByMemberId(String memberId) {
        MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
        MemberVO member = mapper.selectMemberByMemberId(memberId);
        return member;
    }

    @Override
    synchronized public int insertMember(MemberVO member) {
        MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
        return mapper.insertMember(member);
    }

    @Override
    synchronized public int deleteMultiMember(MemberVO member) {
        MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
        return mapper.deleteMultiMember(member);
    }

    @Override
    synchronized public int insertLikeRoom(Map<String, Integer> map) {
        MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
        return mapper.insertLikeRoom(map);
    }

    @Override
    public List<Integer> selectLikeRoom(Map<String, Integer> map) {
        MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
        return mapper.selectLikeRoom(map);
    }

    @Override
    public int deleteLikeRoom(Map<String, Integer> map) {
        MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);

        return mapper.deleteLikeRoom(map);
    }

    @Override
    synchronized public int updateMemberInfoByMemberId(Map<String, String> map) {
        MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
        return mapper.updateMemberInfoByMemberId(map);
    }

    @Override
    synchronized public int updatePasswordByMemberId(Map<String, String> map) {
        MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
        return mapper.updatePasswordByMemberId(map);
    }

}

