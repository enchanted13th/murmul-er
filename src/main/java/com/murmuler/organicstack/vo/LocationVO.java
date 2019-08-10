package com.murmuler.organicstack.vo;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class LocationVO {
    private int id;
    private String sido;
    private String sigungu;
    private String bname;
    private String bname1;
    private String bname2;
    private String jibun;
    private String roadName;
    private String roadJibun;
    private String detailAddr;
    private BigDecimal latitude;
    private BigDecimal longitude;

    public LocationVO() {}
    public LocationVO(int id, String sido, String sigungu, String bname, String bname1, String bname2, String jibun,
                      String roadName, String roadJibun, String detailAddr, BigDecimal latitude, BigDecimal longitude) {
        if (sido == null || sido.equals("")) sido = "empty";
        if (sigungu == null || sigungu.equals("")) sigungu = "empty";
        if (bname == null || bname.equals("")) bname = "empty";
        if (bname1 == null || bname1.equals("")) bname1 = "empty";
        if (bname2 == null || bname2.equals("")) bname2 = "empty";
        if (jibun == null || jibun.equals("")) jibun = "empty";
        if (roadName == null || roadName.equals("")) roadName = "empty";
        if (roadJibun == null || roadJibun.equals("")) roadJibun = "empty";
        if (detailAddr == null || detailAddr.equals("")) roadJibun = "empty";
        if (latitude == null) latitude = new BigDecimal(0);
        if (longitude == null) longitude = new BigDecimal(0);

        this.id = id;
        this.sido = sido;
        this.sigungu = sigungu;
        this.bname = bname;
        this.bname1 = bname1;
        this.bname2 = bname2;
        this.jibun = jibun;
        this.roadName = roadName;
        this.roadJibun = roadJibun;
        this.detailAddr = detailAddr;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
