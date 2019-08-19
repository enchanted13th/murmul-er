package com.murmuler.organicstack.model;

import org.springframework.stereotype.Repository;
import org.springframework.web.socket.WebSocketSession;

import java.util.*;

@Repository
public class TalkRoomRepository {
    private final Map<String, TalkRoom> talkRoomMap;
    private List<TalkRoom> talkRooms;

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

    public synchronized void clearSession(WebSocketSession session) {
        int index = 0;
        while (talkRooms.size() > index) {
            TalkRoom talkRoom = talkRooms.get(index);
            if (talkRoom.hasSession(session)) {
                talkRoom.chatExit(session);
                if (talkRoom.isEmpty()) {
                    talkRoomMap.remove(talkRoom.getId());
                    talkRooms.remove(index);
                    continue;
                }
            }
            index++;
        }
    }
}
