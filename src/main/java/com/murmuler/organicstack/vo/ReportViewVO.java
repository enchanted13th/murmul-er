package com.murmuler.organicstack.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportViewVO {
    private int id;
    private int roomId;
    private int reportType;
    private String content;
    private String processStatus;
}
