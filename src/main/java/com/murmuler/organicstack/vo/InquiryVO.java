package com.murmuler.organicstack.vo;

import lombok.Data;

import java.sql.Date;

@Data
public class InquiryVO {
    private int id;
    private String email;
    private String content;
    private Date writeDate;
    private int processId;

    public InquiryVO() {
        this(0, null, null, null, 0);
    }

    public InquiryVO(int id, String email, String content, Date writeDate, int processId) {
        if (email == null || email.equals(""))
            email = "empty";
        if (content == null || content.equals(""))
            content = "empty";
        if (writeDate == null)
            writeDate = new Date(new java.util.Date().getTime());
        this.id = id;
        this.email = email;
        this.content = content;
        this.writeDate = writeDate;
        this.processId = processId;
    }
}
