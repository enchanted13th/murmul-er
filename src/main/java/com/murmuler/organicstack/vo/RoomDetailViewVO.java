package com.murmuler.organicstack.vo;

import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
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
    private char periodUnit;
    private String postType;
    private int deposit;
    private int monthlyCost;
    private int manageCost;
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

    public RoomDetailViewVO() {}

    public RoomDetailViewVO(int roomId, int memberId, double area, int floor, String heatType, String roomType, String title, String rentType, int periodNum, char periodUnit, String postType, int deposit, int monthlyCost, int manageCost, List<String> manages, List<String> options, boolean hashtagExist, List<String> hashtags, int views, String detailExplain, Date writeDate, List<String> roomImg, String sido, String sigungu, String bname, String bname1, String bname2, String jibun, String roadName, String roadJibun, String detailAddr) {
        this.roomId = roomId;
        this.memberId = memberId;
        this.area = area;
        this.floor = floor;
        this.heatType = heatType;
        this.roomType = roomType;
        this.title = title;
        this.rentType = rentType;
        this.periodNum = periodNum;
        this.periodUnit = periodUnit;
        this.postType = postType;
        this.deposit = deposit;
        this.monthlyCost = monthlyCost;
        this.manageCost = manageCost;
        this.manages = manages;
        this.options = options;
        this.hashtagExist = hashtagExist;
        this.hashtags = hashtags;
        this.views = views;
        this.detailExplain = detailExplain;
        this.writeDate = writeDate;
        this.roomImg = roomImg;
        this.sido = sido;
        this.sigungu = sigungu;
        this.bname = bname;
        this.bname1 = bname1;
        this.bname2 = bname2;
        this.jibun = jibun;
        this.roadName = roadName;
        this.roadJibun = roadJibun;
        this.detailAddr = detailAddr;
    }
}
