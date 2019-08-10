package com.murmuler.organicstack.vo;

import lombok.Data;

@Data
public class RoomVO {
    private int id;
    private double area;
    private int floor;
    private int heatType;
    private String roomType;
    private int locationId;

    public RoomVO() {}

    public RoomVO(int id, double area, int floor, int heatType, String roomType, int locationId) {
        this.id = id;
        this.area = area;
        this.floor = floor;
        this.heatType = heatType;
        this.roomType = roomType;
        this.locationId = locationId;
    }
}