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
            sessions.add(session);
        }

        if (messageVO.getContent() != null && !(messageVO.getContent().equals(""))) {
            try {
                send(messageVO, objectMapper);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
    }

    private <T> void send(T messageObject, ObjectMapper objectMapper) throws JsonProcessingException {
        TextMessage message = new TextMessage(objectMapper.writeValueAsString(messageObject));
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
