package com.murmuler.organicstack.service;

import com.murmuler.organicstack.dao.MemberDAO;
import com.murmuler.organicstack.dao.RoomDAO;
import com.murmuler.organicstack.util.*;
import com.murmuler.organicstack.vo.*;
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
    private RoomService roomService;
    @Autowired
    RoomTypeRecord roomTypeRecord;
    @Autowired
    RentTypeRecord rentTypeRecord;
    @Autowired
    PostStatusRecord postStatusRecord;

    @Override
    public List<RoomSummaryViewVO> getRecentRoom(List<Integer> ids) {
        if(ids == null) {
            return null;
        }
        return roomService.convertVoToViewVo(roomDAO.selectRoomByRoomIds(ids));
    }

    @Override
    public List<RoomSummaryViewVO> getLikeRoom(int memberId) {
        Map<String, Integer> paramMap = new HashMap<>();
        paramMap.put("memberId", memberId);
        return roomService.convertVoToViewVo(roomDAO.selectRoomByLikes(paramMap));
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

    private List<RoomMobileViewVO> convertVoToViewVo(List<RoomDetailVO> voList){
        if(voList == null)
            return null;

        List<RoomMobileViewVO> beanList = new ArrayList<>();
        RoomDetailVO roomDetailVO;

        for(int i=0; i < voList.size(); i++) {
            roomDetailVO = voList.get(i);
            RoomMobileViewVO roomMobileViewVO = new RoomMobileViewVO();
            roomMobileViewVO.setRoomId(roomDetailVO.getRoomId());
            roomMobileViewVO.setRoomType(roomTypeRecord.get(roomDetailVO.getRoomType()));
            roomMobileViewVO.setRentType(rentTypeRecord.get(roomDetailVO.getRentType()));
            roomMobileViewVO.setPeriodNum(roomDetailVO.getPeriodNum());
            if(roomDetailVO.getPeriodUnit().equals("Y")) {
                roomMobileViewVO.setPeriodUnit("년");
            } else if(roomDetailVO.getPeriodUnit().equals("M")) {
                roomMobileViewVO.setPeriodUnit("개월");
            } else if(roomDetailVO.getPeriodUnit().equals("W")) {
                roomMobileViewVO.setPeriodUnit("주");
            }
            int deposit = roomDetailVO.getDeposit() / 10000;
            if(deposit == 0) {
                roomMobileViewVO.setDeposit("없음");
            }
            else if(deposit > 9999) {
                String cost = deposit/10000 + "억 ";
                if(deposit%10000 != 0) {
                    cost += deposit%10000 + "만";
                }
                roomMobileViewVO.setDeposit(cost);
            }
            else {
                roomMobileViewVO.setDeposit(deposit + "만");
            }
            int monthlyCost = roomDetailVO.getMonthlyCost() / 10000;
            if(monthlyCost == 0) {
                roomMobileViewVO.setMonthlyCost("없음");
            }
            else if(monthlyCost > 9999) {
                String cost = monthlyCost/10000 + "억 ";
                if(monthlyCost%10000 != 0) {
                    cost += monthlyCost%10000 + "만";
                }
                roomMobileViewVO.setMonthlyCost(cost);
            }
            else {
                roomMobileViewVO.setMonthlyCost(monthlyCost + "만");
            }
            roomMobileViewVO.setHashtags(roomDetailVO.getHashtags());
            roomMobileViewVO.setRoomImg(roomDetailVO.getRoomImg());
            roomMobileViewVO.setSido(roomDetailVO.getSido());
            roomMobileViewVO.setSigungu(roomDetailVO.getSigungu());
            roomMobileViewVO.setRoadName(roomDetailVO.getRoadname());
            beanList.add(roomMobileViewVO);
        }
        return beanList;
    }

    @Override
    public List<RoomMobileViewVO> getLikeRoomDetail(int memberId) {

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
        return convertVoToViewVo(roomDetailVOList);
    }

}