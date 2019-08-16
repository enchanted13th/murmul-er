package com.murmuler.organicstack.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
