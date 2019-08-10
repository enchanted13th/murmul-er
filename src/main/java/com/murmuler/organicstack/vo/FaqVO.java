package com.murmuler.organicstack.vo;

import lombok.Data;

@Data
public class FaqVO {
    private int id;
    private String title;
    private String content;

    public FaqVO() {
        this(0, null, null);
    }

    public FaqVO(int id, String title, String content) {
        if (title == null || title.equals(""))
            title = "empty";
        if (content == null || content.equals(""))
            ;
        this.id = id;
        this.title = title;
        this.content = content;
    }
}
