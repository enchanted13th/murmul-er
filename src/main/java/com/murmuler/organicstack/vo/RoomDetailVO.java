package com.murmuler.organicstack.vo;

import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
public class RoomDetailVO {
    private int roomId;
    private int memberId;
    private double area;
    private int floor;
    private int heatType;
    private String roomType;
    private String title;
    private int rentType;
    private int periodNum;
    private char periodUnit;
    private int postType;
    private int deposit;
    private int monthlyCost;
    private int manageCost;
    private List<Integer> manages; //관리비 종류
    private List<Integer> options; //옵션 종류
    private boolean hashtagExist;
    private List<String> hashtags; //
    private int views;
    private String detailExplain;
    private Date writeDate;
    private List<String> roomImg; //
    private String sido;
    private String sigungu;
    private String bname;
    private String bname1;
    private String bname2;
    private String jibun;
    private String roadname;
    private String roadJibun;
    private String detailAddr;

    public RoomDetailVO() {}
    public RoomDetailVO(int roomId, int memberId, double area, int floor, int heatType, String roomType, String title, int rentType, int periodNum, char periodUnit, int postType, int deposit, int monthlyCost, int manageCost, List<Integer> manages, List<Integer> options, boolean hashtagExist, List<String> hashtags, int views, String detailExplain, Date writeDate, List<String> roomImg, String sido, String sigungu, String bname, String bname1, String bname2, String jibun, String roadname, String roadJibun, String detailAddr) {
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
        this.roadname = roadname;
        this.roadJibun = roadJibun;
        this.detailAddr = detailAddr;
    }
}
