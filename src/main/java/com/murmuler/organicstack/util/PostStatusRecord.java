package com.murmuler.organicstack.util;

import com.murmuler.organicstack.mybatis.RoomMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class PostStatusRecord {
    public static final int POST_UPDATE_FAIL = 0;
    public static final int POST_POSTING = 1;
    public static final int POST_END_POSTING = 2;
    public static final int POST_DEAL_COMPLETE = 3;
    public static final int POST_NO_POSTING = 4;

    @Autowired
    private SqlSession sqlSession;
    private Map<Long, String> postStatus;

    public PostStatusRecord() {
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
            case "게시중" : id =  POST_POSTING; break;
            case "게시종료" : id =  POST_END_POSTING; break;
            case "거래완료" : id =  POST_DEAL_COMPLETE; break;
            case "게시금지" : id =  POST_NO_POSTING; break;
        }
        return id;
    }
}
