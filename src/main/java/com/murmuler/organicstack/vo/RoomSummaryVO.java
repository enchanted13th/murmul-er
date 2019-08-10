package com.murmuler.organicstack.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Date;

@Data
public class RoomSummaryVO {
    private int roomId;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private int postId;
    private String saleTitle;
    private String roomTypeId;
    private String sido;
    private String sigungu;
    private String roadname;
    private int periodNum;
    private String periodUnit;
    private int rentId;
    private double roomArea;
    private int deposit;
    private int monthlyCost;
    private int manageCost;
    private Date saleDate;
    private int views;
    private String roomImg;

    public RoomSummaryVO() {
    }

    public RoomSummaryVO(int roomId, BigDecimal latitude, BigDecimal longitude, int postId, String saleTitle, String roomTypeId, String sido, String sigungu, String roadname, int periodNum, String periodUnit, int rentId, double roomArea, int deposit, int monthlyCost, int manageCost, Date saleDate, int views, String roomImg) {
        this.roomId = roomId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.postId = postId;
        this.saleTitle = saleTitle;
        this.roomTypeId = roomTypeId;
        this.sido = sido;
        this.sigungu = sigungu;
        this.roadname = roadname;
        this.periodNum = periodNum;
        this.periodUnit = periodUnit;
        this.rentId = rentId;
        this.roomArea = roomArea;
        this.deposit = deposit;
        this.monthlyCost = monthlyCost;
        this.manageCost = manageCost;
        this.saleDate = saleDate;
        this.views = views;
        this.roomImg = roomImg;
    }

}
