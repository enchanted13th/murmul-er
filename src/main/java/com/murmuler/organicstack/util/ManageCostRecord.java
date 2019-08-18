package com.murmuler.organicstack.util;

import com.murmuler.organicstack.mybatis.UtilMapper;
import com.murmuler.organicstack.vo.ManageCostVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class ManageCostRecord {
    @Autowired
    private SqlSession sqlSession;
    private Map<Integer, String> manageCost;

    public ManageCostRecord() {
        manageCost = new HashMap<>();
    }

    @PostConstruct
    private void initManageCost() {
        UtilMapper mapper = sqlSession.getMapper((UtilMapper.class));
        List<ManageCostVO> list = mapper.selectManageCost();
        for(ManageCostVO vo : list) {
            manageCost.put(vo.getId(), vo.getName());
        }
    }

    public String get(Integer key) {
        return manageCost.get(key);
    }

    public Set<Integer> keySet() {
        return manageCost.keySet();
    }

    public Collection<String> values() {
        return manageCost.values();
    }

    public int size() {
        return manageCost.size();
    }

    public int getId(String value) {
        int id = 0;
        for (int key : manageCost.keySet()) {
            if(manageCost.get(key).equals(value)) {
                id = key;
                break;
            }
        }
        return id;
    }

}
