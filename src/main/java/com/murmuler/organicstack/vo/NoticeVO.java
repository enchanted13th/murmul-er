package com.murmuler.organicstack.vo;

import lombok.Data;

import java.sql.Date;

@Data
public class NoticeVO {
    private int id;
    private String title;
    private String content;
    private Date writeDate;

    public NoticeVO() {
        this(0, null, null, null);
    }

    public NoticeVO(int id, String title, String content, Date writeDate) {
        if (title == null || title.equals(""))
            title = "empty";
        if (content == null || content.equals(""))
            content = "empty";
        if (writeDate == null)
            writeDate = new Date(new java.util.Date().getTime());
        this.id = id;
        this.title = title;
        this.content = content;
        this.writeDate = writeDate;
    }
}
