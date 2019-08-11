package com.murmuler.organicstack.util;

import com.murmuler.organicstack.mybatis.RoomMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class OptionRecord {
    @Autowired
    private SqlSession sqlSession;
    private Map<Long, String> option;

    public OptionRecord() {
        option = new HashMap<>();
    }

    @PostConstruct
    private void initOption() {
        RoomMapper mapper = sqlSession.getMapper((RoomMapper.class));
        List<Map<String, Object>> rs = mapper.selectRoomOption();
        Iterator<Map<String, Object>> iterator = rs.iterator();
        while (iterator.hasNext()) {
            Map<String, Object> temp = iterator.next();
            option.put((Long) temp.get("optionId"), (String) temp.get("optionName"));
        }
    }

    public String get(Long key) {
        return option.get(key);
    }

    public Set<Long> keySet() {
        return option.keySet();
    }

    public Collection<String> values() {
        return option.values();
    }

    public int size() {
        return option.size();
    }

    public int getId(String value) {
        int id = 0;
        switch (value) {
            case "냉장고":
                id = 1;
                break;
            case "에어컨":
                id = 2;
                break;
            case "가스레인지":
                id = 3;
                break;
            case "옷장":
                id = 4;
                break;
            case "전자레인지":
                id = 5;
                break;
            case "TV":
                id = 6;
                break;
            case "신발장":
                id = 7;
                break;
            case "비데":
                id = 8;
                break;
            case "인덕션":
                id = 9;
                break;
            case "전자도어락":
                id = 10;
                break;
            case "책상":
                id = 11;
                break;
            case "현관문 안전장치":
                id = 12;
                break;
            case "세탁기":
                id = 13;
                break;
            case "침대":
                id = 14;
                break;
            case "반려동물 가능":
                id = 15;
                break;
            case "엘리베이터 가능":
                id = 16;
                break;
            case "주차 가능":
                id = 17;
                break;
        }
        return id;
    }

    public List<Map<Long, String>> getOptions() {
        List<Map<Long, String>> options = new ArrayList<>();

        for (Long key : option.keySet()) {
            Map<Long, String> ops = new HashMap<>();
            ops.put(key, get(key));
            options.add(ops);
        }
        return options;
    }

}
