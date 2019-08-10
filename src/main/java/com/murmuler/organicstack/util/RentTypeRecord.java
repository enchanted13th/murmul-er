package com.murmuler.organicstack.util;

import java.util.*;

import com.murmuler.organicstack.mybatis.RoomMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;

@Repository
public class RentTypeRecord {
    @Autowired
    private SqlSession sqlSession;
    private Map<Long, String> rentType;
    private RentTypeRecord() {
        rentType = new HashMap<>();
    }

    @PostConstruct
    private void initRentType() {
        RoomMapper mapper = sqlSession.getMapper((RoomMapper.class));
        List<Map<String, Object>> rs = mapper.selectRentType();
        Iterator<Map<String, Object>> iterator = rs.iterator();
        while(iterator.hasNext()){
            Map<String, Object> temp = iterator.next();
            rentType.put((Long)temp.get("rentId"), (String)temp.get("rentName"));
        }
    }

    public String get(Long key) {
        return rentType.get(key);
    }

    public Set<Long> keySet() {
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
        switch (value) {
            case "월세": id = 1; break;
            case "전세": id = 2; break;
            case "단기": id = 3; break;
        }
        return id;
    }
}