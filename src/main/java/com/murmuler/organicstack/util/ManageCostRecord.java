package com.murmuler.organicstack.util;

import com.murmuler.organicstack.mybatis.RoomMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class ManageCostRecord {
    @Autowired
    private SqlSession sqlSession;
    private Map<Long, String> manageCost;

    public ManageCostRecord() {
        manageCost = new HashMap<>();
    }

    @PostConstruct
    private void initManageCost() {
        RoomMapper mapper = sqlSession.getMapper((RoomMapper.class));
        List<Map<String, Object>> rs = mapper.selectRoomManage();
        Iterator<Map<String, Object>> iterator = rs.iterator();
        while(iterator.hasNext()){
            Map<String, Object> temp = iterator.next();
            manageCost.put((Long)temp.get("manageId"), (String)temp.get("manageName"));
        }
    }

    public String get(Long key) {
        return manageCost.get(key);
    }

    public Set<Long> keySet() {
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
        switch(value) {
            case "가스비" : id =  1; break;
            case "수도세" : id =  2; break;
            case "전기세" : id =  3; break;
            case "인터넷요금" : id =  4; break;
            case "TV수신료" : id =  5; break;
        }
        return id;
    }

}
