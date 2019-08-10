package com.murmuler.organicstack.vo;

import lombok.Data;

import java.sql.Date;

@Data
public class ContractVO {
    private int id;
    private int roomId;
    private int sublessorId;
    private int sublesseeId;
    private String contractForm;
    private Date contractDate;
    private String contractURL;
    private String agreementURL;

    public ContractVO() {
        this(0, 0, 0, 0, null, null, null, null);
    }

    public ContractVO(int id, int roomId, int sublessorId, int sublesseeId, String contractForm, Date contractDate,
                      String contractURL, String agreementURL) {
        super();
        this.id = id;
        this.roomId = roomId;
        this.sublessorId = sublessorId;
        this.sublesseeId = sublesseeId;
        this.contractForm = contractForm;
        this.contractDate = contractDate;
        this.contractURL = contractURL;
        this.agreementURL = agreementURL;
    }
}
