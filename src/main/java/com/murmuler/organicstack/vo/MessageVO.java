package com.murmuler.organicstack.vo;

import lombok.Data;

@Data
public class MessageVO {
    private String sender;
    private String content;
    private String date;
    private String time;

    public MessageVO() {}

    public MessageVO(String sender, String content, String date, String time) {
        if (content == null || content.equals("")) content = "empty";
        this.sender = sender;
        this.content = content;
        this.date = date;
        this.time = time;
    }

    @Override
    public String toString() {
        return "{" +
                "sender:\"" + sender + "\"" +
                ", content:\"" + content + "\"" +
                ", date:\"" + date + "\"" +
                ", time:\"" + time + "\"" +
                "}";
    }

}
