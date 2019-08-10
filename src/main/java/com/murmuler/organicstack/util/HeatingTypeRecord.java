package com.murmuler.organicstack.util;

import com.murmuler.organicstack.mybatis.RoomMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class HeatingTypeRecord {
    @Autowired
    private SqlSession sqlSession;
    private Map<Long, String> heatingType;

    public HeatingTypeRecord() {
        heatingType = new HashMap<>();
    }

    @PostConstruct
    private void initHeatingType() {
        RoomMapper mapper = sqlSession.getMapper((RoomMapper.class));
        List<Map<String, Object>> rs = mapper.selectHeatingType();
        Iterator<Map<String, Object>> iterator = rs.iterator();
        while(iterator.hasNext()){
            Map<String, Object> temp = iterator.next();
            heatingType.put((Long)temp.get("heatingId"), (String)temp.get("heatingName"));
        }
    }

    public String get(Long key) {
        return heatingType.get(key);
    }

    public Set<Long> keySet() {
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
        switch (value) {
            case "지역난방": id = 1; break;
            case "개별난방": id = 2; break;
            case "중앙난방": id = 3; break;
        }
        return id;
    }
}
