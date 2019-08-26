package com.murmuler.organicstack.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomMobileViewVO {
    private int roomId;
    private String roomType;
    private String rentType;
    private int periodNum;
    private String periodUnit;
    private String deposit;
    private String monthlyCost;
    private List<String> hashtags;
    private List<String> roomImg;
    private String sido;
    private String sigungu;
    private String roadName;
}
