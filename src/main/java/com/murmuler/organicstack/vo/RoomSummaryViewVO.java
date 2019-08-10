package com.murmuler.organicstack.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Date;

@Data
public class RoomSummaryViewVO {
    private int roomId;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String postType;
    private String title;
    private String sido;
    private String sigungu;
    private String roadname;
    private int periodNum;
    private String periodUnit;
    private String roomType;
    private String rentType;
    private double area;
    private int deposit;
    private int monthlyCost;
    private int manageCost;
    private Date writeDate;
    private int views;
    private String roomImg;

    public RoomSummaryViewVO() {
    }

    public RoomSummaryViewVO(int roomId, BigDecimal latitude, BigDecimal longitude, String postType, String title, String sido, String sigungu, String roadname, int periodNum, String periodUnit, String roomType, String rentType, double area, int deposit, int monthlyCost, int manageCost, Date writeDate, int views, String roomImg) {
        this.roomId = roomId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.postType = postType;
        this.title = title;
        this.sido = sido;
        this.sigungu = sigungu;
        this.roadname = roadname;
        this.periodNum = periodNum;
        this.periodUnit = periodUnit;
        this.roomType = roomType;
        this.rentType = rentType;
        this.area = area;
        this.deposit = deposit;
        this.monthlyCost = monthlyCost;
        this.manageCost = manageCost;
        this.writeDate = writeDate;
        this.views = views;
        this.roomImg = roomImg;
    }

}
