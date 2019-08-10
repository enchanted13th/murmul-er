package com.murmuler.organicstack.dao;

import com.murmuler.organicstack.mybatis.ReportMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class ReportDAOImpl implements ReportDAO {
    @Autowired
    private SqlSession sqlSession;

    @Override
    public int insertReport(int roomId, int reportTypeId, String content) {
        ReportMapper mapper = sqlSession.getMapper(ReportMapper.class);
        Map<String, Object> map = new HashMap<>();
        map.put("roomId", roomId);
        map.put("reportTypeId", reportTypeId);
        map.put("content", content);
        int cnt = mapper.insertReport(map);
        return cnt;
    }

}