package com.murmuler.organicstack.util;

import com.murmuler.organicstack.mybatis.UtilMapper;
import com.murmuler.organicstack.vo.OptionVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class OptionRecord {
    @Autowired
    private SqlSession sqlSession;
    private Map<Integer, String> option;

    public OptionRecord() {
        option = new HashMap<>();
    }

    @PostConstruct
    private void initOption() {
        UtilMapper mapper = sqlSession.getMapper((UtilMapper.class));
        List<OptionVO> list = mapper.selectRoomOption();
        for(OptionVO vo : list) {
            option.put(vo.getId(), vo.getName());
        }
    }

    public String get(Integer key) {
        return option.get(key);
    }

    public Set<Integer> keySet() {
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
        for (int key : option.keySet()) {
            if(option.get(key).equals(value)) {
                id = key;
                break;
            }
        }
        return id;
    }

    public List<Map<Integer, String>> getOptions() {
        List<Map<Integer, String>> options = new ArrayList<>();

        for (Integer key : option.keySet()) {
            Map<Integer, String> ops = new HashMap<>();
            ops.put(key, get(key));
            options.add(ops);
        }
        return options;
    }

}
