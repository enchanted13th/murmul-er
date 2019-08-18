package com.murmuler.organicstack.util;

import java.util.*;

import com.murmuler.organicstack.mybatis.UtilMapper;
import com.murmuler.organicstack.vo.RentTypeVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;

@Repository
public class RentTypeRecord {
    @Autowired
    private SqlSession sqlSession;
    private Map<Integer, String> rentType;

    public RentTypeRecord() {
        rentType = new HashMap<>();
    }

    @PostConstruct
    private void initRentType() {
        UtilMapper mapper = sqlSession.getMapper((UtilMapper.class));
        List<RentTypeVO> list = mapper.selectRentType();
        for(RentTypeVO vo : list) {
            rentType.put(vo.getId(), vo.getName());
        }
    }

    public String get(Integer key) {
        return rentType.get(key);
    }

    public Set<Integer> keySet() {
        return rentType.keySet();
    }

    public Collection<String> values() {
        return rentType.values();
    }

    public int size() {
        return rentType.size();
    }

    public int getId(String value) {
        int id = 0;
        for (int key : rentType.keySet()) {
            if(rentType.get(key).equals(value)) {
                id = key;
                break;
            }
        }
        return id;
    }
}