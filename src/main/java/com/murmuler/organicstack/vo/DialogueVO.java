package com.murmuler.organicstack.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DialogueVO {
    private int id;
    private int sublessorId;
    private int sublesseeId;
    private String contentFileURL;
}
