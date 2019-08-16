package com.murmuler.organicstack.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
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

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", sido='" + sido + '\'' +
                ", sigungu='" + sigungu + '\'' +
                ", bname='" + bname + '\'' +
                ", bname1='" + bname1 + '\'' +
                ", bname2='" + bname2 + '\'' +
                ", jibun='" + jibun + '\'' +
                ", roadName='" + roadName + '\'' +
                ", roadJibun='" + roadJibun + '\'' +
                ", detailAddr='" + detailAddr + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
}
