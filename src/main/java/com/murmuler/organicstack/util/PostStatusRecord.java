package com.murmuler.organicstack.util;

import com.murmuler.organicstack.mybatis.UtilMapper;
import com.murmuler.organicstack.vo.PostStatusVO;
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
    private Map<Integer, String> postStatus;

    public PostStatusRecord() {
        postStatus = new HashMap<>();
    }

    @PostConstruct
    private void initPostStatus() {
        UtilMapper mapper = sqlSession.getMapper((UtilMapper.class));
        List<PostStatusVO> list = mapper.selectPostStatusType();
        for(PostStatusVO vo : list) {
            postStatus.put(vo.getId(), vo.getName());
        }
    }

    public String get(Integer key) {
        return postStatus.get(key);
    }

    public Set<Integer> keySet() {
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
        for (int key : postStatus.keySet()) {
            if(postStatus.get(key).equals(value)) {
                id = key;
                break;
            }
        }
        return id;
    }
}
