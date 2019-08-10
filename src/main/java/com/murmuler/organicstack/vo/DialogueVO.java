package com.murmuler.organicstack.vo;

import lombok.Data;

@Data
public class DialogueVO {
    private int id;
    private int sublessorId;
    private int sublesseeId;
    private String contentFileURL;

    public DialogueVO() {
        this(0, 0, 0, null);
    }

    public DialogueVO(int id, int sublessorId, int sublesseeId, String contentFileURL) {
        super();
        this.id = id;
        this.sublessorId = sublessorId;
        this.sublesseeId = sublesseeId;
        this.contentFileURL = contentFileURL;
    }
}
