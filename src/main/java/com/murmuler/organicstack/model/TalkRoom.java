package com.murmuler.organicstack.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.murmuler.organicstack.vo.MessageVO;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class TalkRoom {
    private String id;
    // private String name;
    // 해당 채팅 방에 연결 된 session 저장 Collection
    private Set<WebSocketSession> sessions = new HashSet<>();

    public static TalkRoom create() {
        TalkRoom created = new TalkRoom();
        created.id = UUID.randomUUID().toString();
        return created;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void handleMessage(WebSocketSession session, MessageVO messageVO, ObjectMapper objectMapper) {
        if (messageVO.getType().equals("JOIN")) {
            System.out.println("JOIN");
            chatInit(session);
        }
        if (messageVO.getContent() != null && !(messageVO.getContent().equals(""))) {
            try {
                send(messageVO, objectMapper);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
    }

    private void chatInit(WebSocketSession session) {
        sessions.add(session);
    }

    private <T> void send(T messageObject, ObjectMapper objectMapper) throws JsonProcessingException {
        TextMessage message = new TextMessage(objectMapper.writeValueAsString(messageObject));
        System.out.println("send message : " + message);
        System.out.println("send payload : " + message.getPayload());
        sessions.parallelStream().forEach(session -> {
            try {
                session.sendMessage(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    public boolean hasSession(WebSocketSession session) {
        return sessions.contains(session);
    }

    public void chatExit(WebSocketSession session) {
        sessions.remove(session);
    }

    public boolean isEmpty() {
        return sessions.size() == 0;
    }
}
