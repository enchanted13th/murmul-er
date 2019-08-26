package com.murmuler.organicstack.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
    private String periodUnit;
    private int postType;
    private int deposit;
    private int monthlyCost;
    private int manageCost;
    private List<Integer> manages;
    private List<Integer> options;
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
    private String roadname;
    private String roadJibun;
    private String detailAddr;
}
