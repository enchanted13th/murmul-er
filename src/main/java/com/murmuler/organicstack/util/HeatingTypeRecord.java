package com.murmuler.organicstack.util;

import com.murmuler.organicstack.mybatis.UtilMapper;
import com.murmuler.organicstack.vo.HeatingTypeVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class HeatingTypeRecord {
    @Autowired
    private SqlSession sqlSession;
    private Map<Integer, String> heatingType;

    public HeatingTypeRecord() {
        heatingType = new HashMap<>();
    }

    @PostConstruct
    private void initHeatingType() {
        UtilMapper mapper = sqlSession.getMapper((UtilMapper.class));
        List<HeatingTypeVO> list = mapper.selectHeatingType();
        for(HeatingTypeVO vo : list) {
            heatingType.put(vo.getId(), vo.getName());
        }
    }

    public String get(Integer key) {
        return heatingType.get(key);
    }

    public Set<Integer> keySet() {
        return heatingType.keySet();
    }

    public Collection<String> values() {
        return heatingType.values();
    }

    public int size() {
        return heatingType.size();
    }

    public int getId(String value) {
        int id = 0;
        for (int key : heatingType.keySet()) {
            if(heatingType.get(key).equals(value)) {
                id = key;
                break;
            }
        }
        return id;
    }
}
