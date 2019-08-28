package com.murmuler.organicstack.mybatis;

import com.murmuler.organicstack.vo.*;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

public interface RoomMapper {
    List<RoomSummaryVO> selectRoomSummaryByLocation(Map<String, Object> map);
    RoomDetailVO selectRoomDetailByRoomId(Map<String, Integer> map);
    List<Integer> selectRoomOptionByRoomId(Map<String, Integer> map);
    List<Integer> selectRoomManageByRoomId(Map<String, Integer> map);
    List<String> selectRoomHashtagByRoomId(Map<String, Integer> map);
    List<String> selectRoomImgUrlByRoomId(Map<String, Integer> map);
    List<RoomSummaryVO> selectMyRoomById(int roomId);
    String selectRoomImgOne(int roomId);
    List<RoomSummaryVO> selectRoomByRoomIds(List<Integer> ids);
    List<RoomSummaryVO> selectRoomByLikes(Map<String, Integer> map);
    int selectOneRecentLocation();
    int selectOneRecentRoom();
    int selectLocationIdByRoomId(int roomId);
    int selectRoomIdByMemberId(int memberId);
    int selectRoomIdByLocationId(int locationId);
    LocationVO selectRoomLocation(int locationId);
    RoomVO selectRoomInfo(int roomId);
    SaleInfoVO selectRoomSaleInfo(int roomId);
    int selectImgCntByRoomId(int roomId);
    List<Integer> selectRoomIdListByMemberId(int memberId);

    int insertLocation(LocationVO locationVO);
    int insertRoom(RoomVO roomVO);
    int insertSaleInfo(SaleInfoVO saleInfoVO);
    int insertRoomManageCost(Map<String, Object> map);
    int insertRoomOption(Map<String, Object> map);
    int insertRoomHashtag(Map<String, Object> map);
    int insertRoomImage(Map<String, Object> map);

    int updateLocation(LocationVO locationVO);
    int updateRoom(RoomVO roomVO);
    int updateDetailLocation(LocationVO locationVO);
    int updateSale(SaleInfoVO saleInfoVO);
    int updateViews(Map<String, Integer> map);
    int updatePostType(Map<String, Integer> map);

    int deleteHashtag(int roomId);
    int deleteOption(int roomId);
    int deleteManageCost(int roomId);
    int deleteRoomImg(int roomId);
    int deleteRoom(int roomId);

    int updateMultiPostType(Map<String, Object> paramMap);

    List<RoomDetailVO> selectRoomByLikesDetail(Map<String, Integer> map);

    List<RoomSummaryVO> selectMyPostingRoomById(int memberId);
}
