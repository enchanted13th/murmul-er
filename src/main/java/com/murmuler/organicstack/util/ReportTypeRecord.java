package com.murmuler.organicstack.util;

import com.murmuler.organicstack.mybatis.UtilMapper;
import com.murmuler.organicstack.vo.ReportTypeVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class ReportTypeRecord {
    @Autowired
    private SqlSession sqlSession;
    private Map<Integer, String> reportType;

    public ReportTypeRecord() {
        reportType = new HashMap<>();
    }

    @PostConstruct
    public void initReportType() {
        UtilMapper mapper = sqlSession.getMapper((UtilMapper.class));
        List<ReportTypeVO> list = mapper.selectReportType();
        for(ReportTypeVO vo : list) {
            reportType.put(vo.getId(), vo.getName());
        }
    }

    public String get(int key) {
        return reportType.get(key);
    }

    public Set<Integer> keySet() {
        return reportType.keySet();
    }

    public Collection<String> values() {
        return reportType.values();
    }

    public int size() {
        return reportType.size();
    }

    public int getId(String value) {
        int id = 0;
        for (int key : reportType.keySet()) {
            if(reportType.get(key).equals(value)) {
                id = key;
                break;
            }
        }
        return id;
    }

}
