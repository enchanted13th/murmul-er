package com.murmuler.organicstack.util;

import com.murmuler.organicstack.mybatis.RoomMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class ProcessStatusRecord {
    @Autowired
    private SqlSession sqlSession;
    private Map<Long, String> processStatus;

    private ProcessStatusRecord() {
        processStatus = new HashMap<>();
    }

    @PostConstruct
    private void initProcessStatus() {
        RoomMapper mapper = sqlSession.getMapper((RoomMapper.class));
        List<Map<String, Object>> rs = mapper.selectProcessStatusType();
        Iterator<Map<String, Object>> iterator = rs.iterator();
        while(iterator.hasNext()){
            Map<String, Object> temp = iterator.next();
            processStatus.put((Long)temp.get("processId"), (String)temp.get("processName"));
        }
    }

    public String get(Long key) {
        return processStatus.get(key);
    }

    public Set<Long> keySet() {
        return processStatus.keySet();
    }

    public Collection<String> values() {
        return processStatus.values();
    }

    public int size() {
        return processStatus.size();
    }

    public int getId(String value) {
        int id = 0;
        switch (value) {
            case "처리대기": id = 1; break;
            case "처리중": id = 2; break;
            case "처리완료": id = 3; break;
            case "처리불가": id = 4; break;
        }
        return id;
    }
}
