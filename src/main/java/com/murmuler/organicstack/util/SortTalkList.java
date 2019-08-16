package com.murmuler.organicstack.util;

import com.murmuler.organicstack.vo.MessageVO;

import java.util.Collections;
import java.util.Comparator;
import java.util.Map;

public class SortTalkList implements Comparator<Map<String, Object>> {

    @Override
    public int compare(Map<String, Object> o1, Map<String, Object> o2) {
        MessageVO m1 = (MessageVO) o1.get("lastMessage");
        MessageVO m2 = (MessageVO) o2.get("lastMessage");

        int dateResult = m1.getDate().compareTo(m2.getDate());

        if(dateResult == 0) { /* 날짜가 같다면 시간 비교 */
            return m1.getTime().compareTo(m2.getTime());
        }
        else {
            return dateResult;
        }
    }
}