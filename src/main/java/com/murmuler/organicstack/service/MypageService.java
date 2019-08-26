package com.murmuler.organicstack.service;

import com.murmuler.organicstack.vo.RoomDetailViewVO;
import com.murmuler.organicstack.vo.RoomMobileViewVO;
import com.murmuler.organicstack.vo.RoomSummaryViewVO;

import java.util.List;
import java.util.Map;

public interface MypageService {
    List<RoomSummaryViewVO> getRecentRoom(List<Integer> ids);
    List<RoomSummaryViewVO> getLikeRoom(int memberId);
    List<Integer> getLikeRoomNumber(int memberId);
    int addLikeRoom(int memberId, int roomId);
    int removeLikeRoom(int memberId, int rooomId);
    List<RoomMobileViewVO> getLikeRoomDetail(int memberId);
}