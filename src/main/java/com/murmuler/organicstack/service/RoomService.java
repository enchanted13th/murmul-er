package com.murmuler.organicstack.service;

import com.murmuler.organicstack.vo.RoomDetailViewVO;
import com.murmuler.organicstack.vo.RoomSummaryVO;
import com.murmuler.organicstack.vo.RoomSummaryViewVO;

import java.util.List;
import java.util.Map;

public interface RoomService {
    List<RoomSummaryViewVO> getRoomsByLocation(Map<String, Object> map);
    RoomDetailViewVO getRoomDetailByRoomId(Map<String, Integer> map);
    List<RoomSummaryViewVO> getMyRooms(int id);
    int addRoom(Map<String, String> roomInfo);
    int modifyRoom(Map<String, String> roomInfo);
    int modifyViews(int roomId, int Views);
    int removeRoom(int roomId);
}
