package com.murmuler.organicstack.vo;

import lombok.Data;

import java.sql.Date;

@Data
public class SaleInfoVO {
    private int roomId;
    private String title;
    private int rentType;
    private int periodNum;
    private String periodUnit;
    private int postType;
    private int deposit;
    private int monthlyCost;
    private int manageCost;
    private String hashtagExist;
    private Date writeDate;
    private int views;
    private String detailExplain;
    private int memberId;

    public SaleInfoVO() {}

    public SaleInfoVO(int roomId, String title, int rentType, int periodNum, String periodUnit, int postType, int deposit, int monthlyCost, int manageCost, String hashtagExist, Date writeDate, int views, String detailExplain, int memberId) {
        this.roomId = roomId;
        this.title = title;
        this.rentType = rentType;
        this.periodNum = periodNum;
        this.periodUnit = periodUnit;
        this.postType = postType;
        this.deposit = deposit;
        this.monthlyCost = monthlyCost;
        this.manageCost = manageCost;
        this.hashtagExist = hashtagExist;
        this.writeDate = writeDate;
        this.views = views;
        this.detailExplain = detailExplain;
        this.memberId = memberId;
    }

}