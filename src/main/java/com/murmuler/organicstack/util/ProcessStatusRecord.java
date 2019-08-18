package com.murmuler.organicstack.util;

import com.murmuler.organicstack.mybatis.UtilMapper;
import com.murmuler.organicstack.vo.ProcessStatusVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class ProcessStatusRecord {
    @Autowired
    private SqlSession sqlSession;
    private Map<Integer, String> processStatus;

    public ProcessStatusRecord() {
        processStatus = new HashMap<>();
    }

    @PostConstruct
    private void initProcessStatus() {
        UtilMapper mapper = sqlSession.getMapper((UtilMapper.class));
        List<ProcessStatusVO> list = mapper.selectProcessStatusType();
        for(ProcessStatusVO vo : list) {
            processStatus.put(vo.getId(), vo.getName());
        }
    }

    public String get(Integer key) {
        return processStatus.get(key);
    }

    public Set<Integer> keySet() {
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
        for (int key : processStatus.keySet()) {
            if(processStatus.get(key).equals(value)) {
                id = key;
                break;
            }
        }
        return id;
    }
}
