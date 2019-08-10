package com.murmuler.organicstack.util;

import java.util.*;

import com.murmuler.organicstack.mybatis.RoomMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;

@Repository
public class RoomTypeRecord {
    @Autowired
    private SqlSession sqlSession;
    private Map<String, String> roomType;

    private RoomTypeRecord() {
        roomType = new HashMap<>();
    }

    @PostConstruct
    private void initRoomType() {
        RoomMapper mapper = sqlSession.getMapper((RoomMapper.class));
        List<Map<String, String>> rs = mapper.selectRoomType();
        Iterator<Map<String, String>> iterator = rs.iterator();
        while(iterator.hasNext()){
            Map<String, String> temp = iterator.next();
            roomType.put((String)temp.get("roomTypeId"), (String)temp.get("roomTypeName"));
        }
    }

    public String get(String key) {
        return roomType.get(key);
    }

    public Set<String> keySet() {
        return roomType.keySet();
    }

    public Collection<String> values() {
        return roomType.values();
    }

    public int size() {
        return roomType.size();
    }

    public String getId(String value) {
        String id = "";
        switch (value) {
            case "아파트": id = "AP"; break;
            case "오피스텔": id = "OP"; break;
            case "원룸": id = "OR"; break;
            case "투룸": id = "TR"; break;
            case "빌라": id = "VI"; break;
        }
        return id;
    }
}
