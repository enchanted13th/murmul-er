package com.murmuler.organicstack.dao;

import com.murmuler.organicstack.mybatis.ReportMapper;
import com.murmuler.organicstack.vo.ReportViewVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class ReportDAOImpl implements ReportDAO {
    @Autowired
    private SqlSession sqlSession;

    @Override
    synchronized public int insertReport(int roomId, int reportTypeId, String content) {
        ReportMapper mapper = sqlSession.getMapper(ReportMapper.class);
        Map<String, Object> map = new HashMap<>();
        map.put("roomId", roomId);
        map.put("reportTypeId", reportTypeId);
        map.put("content", content);
        return mapper.insertReport(map);
    }

    @Override
    public List<ReportViewVO> selectAllReports() {
        ReportMapper mapper = sqlSession.getMapper(ReportMapper.class);
        return mapper.selectAllReports();
    }

    @Override
    synchronized public int deleteMultiReport(Map<String, Object> idMap) {
        ReportMapper mapper = sqlSession.getMapper(ReportMapper.class);
        return mapper.deleteMultiReport(idMap);
    }

    @Override
    synchronized public int updateProcessStatus(int id, int processId) {
        ReportMapper mapper = sqlSession.getMapper(ReportMapper.class);
        Map<String, Integer> map = new HashMap<>();
        map.put("id", id);
        map.put("processId", processId);
        return mapper.updateProcessStatus(map);
    }

}