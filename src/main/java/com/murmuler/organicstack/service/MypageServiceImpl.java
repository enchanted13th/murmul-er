package com.murmuler.organicstack.service;

import com.murmuler.organicstack.dao.MemberDAO;
import com.murmuler.organicstack.dao.RoomDAO;
import com.murmuler.organicstack.util.*;
import com.murmuler.organicstack.vo.RoomDetailVO;
import com.murmuler.organicstack.vo.RoomDetailViewVO;
import com.murmuler.organicstack.vo.RoomSummaryVO;
import com.murmuler.organicstack.vo.RoomSummaryViewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MypageServiceImpl implements MypageService {
    @Autowired
    private MemberDAO memberDAO;
    @Autowired
    private RoomDAO roomDAO;
    @Autowired
    RoomTypeRecord roomTypeRecord;
    @Autowired
    RentTypeRecord rentTypeRecord;
    @Autowired
    PostStatusRecord postStatusRecord;

    @Override
    public List<RoomSummaryViewVO> getRecentRoom(List<Integer> ids) {
       return convertVoToViewVo(roomDAO.selectRoomByRoomIds(ids));
    }

    @Override
    public List<RoomSummaryViewVO> getLikeRoom(int memberId) {
        Map<String, Integer> paramMap = new HashMap<>();
        paramMap.put("memberId", memberId);
        return convertVoToViewVo(roomDAO.selectRoomByLikes(paramMap));
    }

    @Override
    public List<Integer> getLikeRoomNumber(int memberId) {
        Map<String, Integer> paramMap = new HashMap<>();
        paramMap.put("memberId", memberId);
        return memberDAO.selectLikeRoom(paramMap);
    }

    @Override
    public int addLikeRoom(int memberId, int roomId) {
        Map<String, Integer> paramMap = new HashMap<>();
        paramMap.put("memberId", memberId);
        paramMap.put("roomId", roomId);
        return memberDAO.insertLikeRoom(paramMap);
    }

    @Override
    public int removeLikeRoom(int memberId, int roomId) {
        Map<String, Integer> paramMap = new HashMap<>();
        paramMap.put("memberId", memberId);
        paramMap.put("roomId", roomId);
        return memberDAO.deleteLikeRoom(paramMap);
    }

    private List<RoomSummaryViewVO> convertVoToViewVo(List<RoomSummaryVO> voList){
        if(voList == null)
            return null;

        List<RoomSummaryViewVO> beanList = new ArrayList<>();
        RoomSummaryVO roomSummaryVO;


        for(int i=0; i < voList.size(); i++) {
            roomSummaryVO = voList.get(i);
            RoomSummaryViewVO roomSummaryViewVO = new RoomSummaryViewVO();
            roomSummaryViewVO.setRoomId(roomSummaryVO.getRoomId());
            roomSummaryViewVO.setLatitude(roomSummaryVO.getLatitude());
            roomSummaryViewVO.setLongitude(roomSummaryVO.getLongitude());
            roomSummaryViewVO.setPostType(postStatusRecord.get(roomSummaryVO.getPostId()));
            roomSummaryViewVO.setTitle(roomSummaryVO.getSaleTitle());
            roomSummaryViewVO.setRoomType(roomTypeRecord.get(roomSummaryVO.getRoomTypeId()));
            roomSummaryViewVO.setRentType(rentTypeRecord.get(roomSummaryVO.getRentId()));
            roomSummaryViewVO.setArea(roomSummaryVO.getRoomArea());
            roomSummaryViewVO.setDeposit(roomSummaryVO.getDeposit());
            roomSummaryViewVO.setMonthlyCost(roomSummaryVO.getMonthlyCost());
            roomSummaryViewVO.setManageCost(roomSummaryVO.getManageCost());
            roomSummaryViewVO.setWriteDate(roomSummaryVO.getSaleDate());
            roomSummaryViewVO.setViews(roomSummaryVO.getViews());
            roomSummaryViewVO.setRoomImg(roomSummaryVO.getRoomImg());
            roomSummaryViewVO.setSido(roomSummaryVO.getSido());
            roomSummaryViewVO.setSigungu(roomSummaryVO.getSigungu());
            roomSummaryViewVO.setRoadname(roomSummaryVO.getRoadname());
            roomSummaryViewVO.setPeriodNum(roomSummaryVO.getPeriodNum());
            roomSummaryViewVO.setPeriodUnit(roomSummaryVO.getPeriodUnit());
            beanList.add(roomSummaryViewVO);
        }
        return beanList;
    }

    private List<RoomDetailViewVO> convertVoToViewVoDetail(List<RoomDetailVO> voList){
        if(voList == null)
            return null;

        List<RoomDetailViewVO> beanList = new ArrayList<>();
        RoomDetailVO roomDetailVO;


        for(int i=0; i < voList.size(); i++) {
            roomDetailVO = voList.get(i);
            RoomDetailViewVO roomDetailViewVO = new RoomDetailViewVO();
            roomDetailViewVO.setDeposit(roomDetailVO.getDeposit());
            roomDetailViewVO.setRoomId(roomDetailVO.getRoomId());
            roomDetailViewVO.setRoomType(roomTypeRecord.get(roomDetailVO.getRoomType()));
            roomDetailViewVO.setRentType(rentTypeRecord.get(roomDetailVO.getRentType()));
            roomDetailViewVO.setMonthlyCost(roomDetailVO.getMonthlyCost());
            //roomDetailViewVO.setManageCost(roomDetailVO.getManageCost());
            //roomDetailViewVO.setViews(roomDetailVO.getViews());
            roomDetailViewVO.setHashtags(roomDetailVO.getHashtags());
            roomDetailViewVO.setRoomImg(roomDetailVO.getRoomImg());
            roomDetailViewVO.setSido(roomDetailVO.getSido());
            roomDetailViewVO.setSigungu(roomDetailVO.getSigungu());
            roomDetailViewVO.setRoadName(roomDetailVO.getRoadname());
            roomDetailViewVO.setPeriodNum(roomDetailVO.getPeriodNum());
            roomDetailViewVO.setPeriodUnit(roomDetailVO.getPeriodUnit());
            beanList.add(roomDetailViewVO);
        }
        return beanList;
    }

    @Override
    public List<RoomDetailViewVO> getLikeRoomDetail(int memberId) {

        Map<String, Integer> map = new HashMap<>();
        map.put("memberId", memberId);

        List<RoomDetailVO> roomDetailVOList = roomDAO.selectRoomByLikesDetail(map);

        for(int i=0; i < roomDetailVOList.size(); i++){
            RoomDetailVO roomDetailVO = roomDetailVOList.get(i);
            map.put("roomId",roomDetailVO.getRoomId());
            List<String> roomHashtags = roomDAO.selectRoomHashtagByRoomId(map);
            List<String> roomImgUrls = roomDAO.selectRoomImgUrlByRoomId(map);

            roomDetailVO.setHashtags(roomHashtags);
            roomDetailVO.setRoomImg(roomImgUrls);
            map.clear();
        }

        return convertVoToViewVoDetail(roomDetailVOList);
    }

}