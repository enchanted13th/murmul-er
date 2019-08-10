package com.murmuler.organicstack.util;

import com.murmuler.organicstack.mybatis.RoomMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class PostStatusRecord {
    @Autowired
    private SqlSession sqlSession;
    private Map<Long, String> postStatus;

    private PostStatusRecord() {
        postStatus = new HashMap<>();
    }

    @PostConstruct
    private void initPostStatus() {
        RoomMapper mapper = sqlSession.getMapper((RoomMapper.class));
        List<Map<String, Object>> rs = mapper.selectPostStatusType();
        Iterator<Map<String, Object>> iterator = rs.iterator();
        while(iterator.hasNext()){
            Map<String, Object> temp = iterator.next();
            postStatus.put((Long)temp.get("postId"), (String)temp.get("postName"));
        }
    }

    public String get(Long key) {
        return postStatus.get(key);
    }

    public Set<Long> keySet() {
        return postStatus.keySet();
    }

    public Collection<String> values() {
        return postStatus.values();
    }

    public int size() {
        return postStatus.size();
    }

    public int getId(String value) {
        int id = 0;
        switch(value) {
            case "게시중" : id =  1; break;
            case "게시종료" : id =  2; break;
            case "거래완료" : id =  3; break;
            case "게시금지" : id =  4; break;
        }
        return id;
    }
}
