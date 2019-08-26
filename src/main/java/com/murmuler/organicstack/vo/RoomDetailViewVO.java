package com.murmuler.organicstack.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDetailViewVO {
    private int roomId;
    private int memberId;
    private double area;
    private int floor;
    private String heatType;
    private String roomType;
    private String title;
    private String rentType;
    private int periodNum;
    private String periodUnit;
    private String postType;
    private String deposit;
    private String monthlyCost;
    private String manageCost;
    private List<String> manages;
    private List<String> options;
    private boolean hashtagExist;
    private List<String> hashtags;
    private int views;
    private String detailExplain;
    private Date writeDate;
    private List<String> roomImg;
    private String sido;
    private String sigungu;
    private String bname;
    private String bname1;
    private String bname2;
    private String jibun;
    private String roadName;
    private String roadJibun;
    private String detailAddr;
}
