package com.murmuler.organicstack.util;

import com.murmuler.organicstack.mybatis.ReportMapper;
import com.murmuler.organicstack.mybatis.RoomMapper;
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
        ReportMapper mapper = sqlSession.getMapper(ReportMapper.class);
        List<Map<String, Object>> list = mapper.selectReportType();
        Iterator<Map<String, Object>> iterator = list.iterator();
        while (iterator.hasNext()) {
            Map<String, Object> temp = iterator.next();
            long tmp = (Long) temp.get("id");
            int reportId = (int) tmp;
            String reportName = (String) temp.get("content");
            reportType.put(reportId, reportName);
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
        switch (value) {
            case "거래가 완료된 매물":
                id = 1;
                break;
            case "정보가 다른 매물":
                id = 2;
                break;
        }
        return id;
    }

}
