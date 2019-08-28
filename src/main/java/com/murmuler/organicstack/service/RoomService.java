package com.murmuler.organicstack.service;

import com.murmuler.organicstack.vo.RoomDetailVO;
import com.murmuler.organicstack.vo.RoomDetailViewVO;
import com.murmuler.organicstack.vo.RoomSummaryVO;
import com.murmuler.organicstack.vo.RoomSummaryViewVO;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface RoomService {
    List<RoomSummaryViewVO> getRoomsByLocation(Map<String, Object> map);
    RoomDetailViewVO getRoomDetailByRoomId(Map<String, Integer> map);
    List<RoomSummaryViewVO> getMyRooms(int id);
    Map<String, Object> getRoomInfo(int roomId);
    List<String> getRoomOptions(int roomId);
    List<Integer> getRoomIdListByMemberId(int memberId);
    List<RoomSummaryViewVO> getMyPostingRoom(int memberId);
    int addRoom(Map<String, String> roomInfo);
    int addImg(int roomId, ArrayList<String> imgUrlList);
    int modifyRoom(Map<String, String> roomInfo);
    int modifyViews(int roomId, int views);
    int modifyPostType(int roomId, String postType);
    int removeRoom(int roomId);
    List<RoomSummaryViewVO> convertVoToViewVo(List<RoomSummaryVO> voList);
    RoomDetailViewVO convertVoToViewVo(RoomDetailVO roomDetailVO);
    int getRoomIdByMemberId(int memberId);
    int modifyImg(int roomId, ArrayList<String> imgUrlList);
    int modifyMultiPostType(Map<String, Object> idMap);
}
