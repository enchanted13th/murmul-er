package com.murmuler.organicstack.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.murmuler.organicstack.model.TalkRoom;
import com.murmuler.organicstack.model.TalkRoomRepository;
import com.murmuler.organicstack.util.TalkHelper;
import com.murmuler.organicstack.vo.MessageVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.File;

@Profile("!stomp")
@Component
public class TalkHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final TalkRoomRepository repository;

    private Log logger = LogFactory.getLog(TalkHelper.class);

    @Autowired
    private TalkHelper talkHelper;

    @Autowired
    public TalkHandler(ObjectMapper objectMapper, TalkRoomRepository chatRoomRepository) {
        this.objectMapper = objectMapper;
        this.repository = chatRoomRepository;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        logger.info("payload : " + payload);
        MessageVO payloadMessage = objectMapper.readValue(payload, MessageVO.class);

        MessageVO messageMe = null;
        File file;
        int me = Integer.parseInt(payloadMessage.getSender());
        int you = Integer.parseInt(payloadMessage.getReceiver());

        if (payloadMessage.getType().equals("IMAGE")) {
            file = talkHelper.getFilePath(me, you);
            if (file != null) {
                messageMe = talkHelper.writeMessage("ME_FILE", payloadMessage.getContent(), file);
            }

            file = talkHelper.getFilePath(you, me);
            if (file != null) {
                talkHelper.writeMessage("YOU_FILE", payloadMessage.getContent(), file);
            }
        } else {
            file = talkHelper.getFilePath(me, you);
            if (file != null) {
                messageMe = talkHelper.writeMessage("ME", payloadMessage.getContent(), file);
            }

            file = talkHelper.getFilePath(you, me);
            if (file != null) {
                talkHelper.writeMessage("YOU", payloadMessage.getContent(), file);
            }
        }

        if (messageMe != null) {
            messageMe.setTalkRoomId(payloadMessage.getTalkRoomId());
            messageMe.setSender(payloadMessage.getSender());
            messageMe.setReceiver(payloadMessage.getReceiver());
            messageMe.setType(payloadMessage.getType());
            TalkRoom talkRoom = repository.getTalkRoom(messageMe.getTalkRoomId());
            talkRoom.handleMessage(session, messageMe, objectMapper);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        for (TalkRoom talkRoom : repository.getTalkRooms()) {
            if (talkRoom.hasSession(session)) {
                talkRoom.chatExit(session);
                logger.info("chat exit");
//                if (talkRoom.isEmpty()) {
//                    System.out.println("room remove");
//                    repository.getTalkRooms().remove(talkRoom);
//                }
            }
        }
        System.out.println(repository.getTalkRooms().size());
    }
}