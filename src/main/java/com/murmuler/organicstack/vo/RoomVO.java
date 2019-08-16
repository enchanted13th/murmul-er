package com.murmuler.organicstack.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomVO {
    private int id;
    private double area;
    private int floor;
    private int heatType;
    private String roomType;
    private int locationId;
}