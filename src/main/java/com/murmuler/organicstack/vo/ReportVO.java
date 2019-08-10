package com.murmuler.organicstack.vo;

import lombok.Data;

@Data
public class ReportVO {
    private int id;
    private int roomId;
    private int reportType;
    private String content;
    private int processId;

    public ReportVO() {}

    public ReportVO(int id, int roomId, int reportType, String content, int processId) {
        if (content == null || content.equals("")) content = "empty";
        this.id = id;
        this.roomId = roomId;
        this.reportType = reportType;
        this.content = content;
        this.processId = processId;
    }
}
