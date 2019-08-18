package com.murmuler.organicstack.util;

import java.util.*;

import com.murmuler.organicstack.mybatis.UtilMapper;
import com.murmuler.organicstack.vo.RoomTypeVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;

@Repository
public class RoomTypeRecord {
    @Autowired
    private SqlSession sqlSession;
    private Map<String, String> roomType;

    public RoomTypeRecord() {
        roomType = new HashMap<>();
    }

    @PostConstruct
    private void initRoomType() {
        UtilMapper mapper = sqlSession.getMapper((UtilMapper.class));
        List<RoomTypeVO> list = mapper.selectRoomType();
        for(RoomTypeVO vo : list) {
            roomType.put(vo.getId(), vo.getName());
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
        for (String key : roomType.keySet()) {
            if(roomType.get(key).equals(value)) {
                id = key;
                break;
            }
        }
        return id;
    }
}
