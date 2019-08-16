package com.murmuler.organicstack.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InquiryVO {
    private int id;
    private String email;
    private String content;
    private Date writeDate;
    private int processId;
}
