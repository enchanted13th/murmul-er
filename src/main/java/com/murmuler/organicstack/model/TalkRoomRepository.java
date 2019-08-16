package com.murmuler.organicstack.model;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Repository
public class TalkRoomRepository {
    private final Map<String, TalkRoom> talkRoomMap;
    private Collection<TalkRoom> talkRooms;

    public TalkRoomRepository() {
        talkRoomMap = new HashMap<>();
        talkRooms = new ArrayList<>();
    }

    public void addTalkRoom(TalkRoom talkRoom) {
        talkRoomMap.put(talkRoom.getId(), talkRoom);
        talkRooms.add(talkRoom);
    }

    public TalkRoom getTalkRoom(String id) {
        return talkRoomMap.get(id);
    }

    public Collection<TalkRoom> getTalkRooms() {
        return talkRooms;
    }
}
