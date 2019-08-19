package com.murmuler.organicstack.service;

import com.murmuler.organicstack.dao.RoomDAO;
import com.murmuler.organicstack.util.*;
import com.murmuler.organicstack.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RoomServiceImpl implements RoomService {
    private final int listSize = 6;
    @Autowired
    private RoomDAO roomDAO;
    @Autowired
    HeatingTypeRecord heatingTypeRecord;
    @Autowired
    RoomTypeRecord roomTypeRecord;
    @Autowired
    RentTypeRecord rentTypeRecord;
    @Autowired
    PostStatusRecord postStatusRecord;
    @Autowired
    ManageCostRecord manageCostRecord;
    @Autowired
    OptionRecord optionRecord;

    @Override
    public List<RoomSummaryViewVO> getRoomsByLocation(Map<String, Object> map) {
        if(map == null)
            return null;
        int page = (Integer) map.get("page");
        page = (page - 1) * listSize;
        if (page < 0) page = 0;
        map.replace("page", page);
        map.put("listSize", listSize);
        return convertVoToViewVo(roomDAO.selectRoomSummaryByLocation(map));
    }

    @Override
    public RoomDetailViewVO getRoomDetailByRoomId(Map<String, Integer> map) {
        RoomDetailVO roomDetailVO = roomDAO.selectRoomDetailByRoomId(map);
        List<Integer> roomOptions = roomDAO.selectRoomOptionByRoomId(map);
        List<Integer> roomManages = roomDAO.selectRoomManageByRoomId(map);
        List<String> roomHashtags = roomDAO.selectRoomHashtagByRoomId(map);
        List<String> roomImgUrls = roomDAO.selectRoomImgUrlByRoomId(map);
        roomDetailVO.setOptions(roomOptions);
        roomDetailVO.setManages(roomManages);
        roomDetailVO.setHashtags(roomHashtags);
        roomDetailVO.setRoomImg(roomImgUrls);
        return convertVoToViewVo(roomDetailVO);
    }

    @Override
    public List<RoomSummaryViewVO> getMyRooms(int id) {
        List<RoomSummaryVO> list = roomDAO.selectMyRooms(id);
        return convertVoToViewVo(list);
    }

    @Override
    public int addRoom(Map<String, String> roomInfo) {
        if(roomInfo == null)
            return 0;

        LocationVO locationVO = new LocationVO();
        RoomVO roomVO = new RoomVO();
        SaleInfoVO saleInfoVO = new SaleInfoVO();

        /* ----- 위치 정보 등록 (location) ----- */
        locationVO.setSido(roomInfo.get("sido"));
        locationVO.setSigungu(roomInfo.get("sigungu"));
        locationVO.setBname(roomInfo.get("bname"));
        locationVO.setBname1(roomInfo.get("bname1"));
        locationVO.setBname2(roomInfo.get("bname2"));
        locationVO.setJibun(roomInfo.get("jibun"));
        locationVO.setRoadName(roomInfo.get("roadName"));
        locationVO.setRoadJibun(roomInfo.get("roadJibun"));
        locationVO.setLatitude(new BigDecimal(roomInfo.get("latitude")));
        locationVO.setLongitude(new BigDecimal(roomInfo.get("longitude")));
        locationVO.setDetailAddr(roomInfo.get("detailAddr"));
        System.out.println(locationVO);

        /* ----- 방 정보 등록 (room) ----- */
        roomVO.setArea(Double.parseDouble(roomInfo.get("area")));
        roomVO.setFloor(Integer.parseInt(roomInfo.get("floor")));
        roomVO.setHeatType(heatingTypeRecord.getId(roomInfo.get("heatType")));
        roomVO.setRoomType(roomTypeRecord.getId(roomInfo.get("roomType")));
        System.out.println(roomVO);

        /* ----- 판매 정보 등록 (sale) ----- */
        saleInfoVO.setTitle(roomInfo.get("title"));
        saleInfoVO.setRentType(rentTypeRecord.getId(roomInfo.get("rentType")));
        saleInfoVO.setPeriodNum(Integer.parseInt(roomInfo.get("periodNum")));
        saleInfoVO.setPeriodUnit(roomInfo.get("periodUnit"));
        saleInfoVO.setPostType(1);
        saleInfoVO.setDeposit(Integer.parseInt(roomInfo.get("deposit")));
        saleInfoVO.setMonthlyCost(Integer.parseInt(roomInfo.get("monthlyCost")));
        int manageCost = roomInfo.get("manageCost").equals("") ? 0 : Integer.parseInt(roomInfo.get("manageCost"));
        saleInfoVO.setManageCost(manageCost);
//        saleInfoVO.setWriteDate(new Date(0));
//        saleInfoVO.setViews(0);
        saleInfoVO.setDetailExplain(roomInfo.get("detailExplain"));
        saleInfoVO.setMemberId(Integer.parseInt(roomInfo.get("memberId")));
        String hashtagExist = roomInfo.get("hashtagExist").equals("true") ? "Y" : "N";
        saleInfoVO.setHashtagExist(hashtagExist);
        System.out.println(saleInfoVO);

        int roomId = roomDAO.insertRoom(locationVO, roomVO, saleInfoVO);
        if(roomId == roomDAO.FAIL)
            return roomDAO.FAIL;
        boolean result = true;
        String[] temp;
        if(!roomInfo.get("manageIdList").equals("")) {
            temp = roomInfo.get("manageIdList").split(",");
            int[] manageIdList = new int[temp.length];
            for (int i = 0; i < temp.length; i++) {
                manageIdList[i] = manageCostRecord.getId(temp[i]);
                System.out.println("관리항목 : " + manageIdList[i]);
            }
            result = result && (roomDAO.insertRoomManageCost(roomId, manageIdList) > 0);
        }
        System.out.println("manage"+result);
        if (!roomInfo.get("optionList").equals("")) {
            temp = roomInfo.get("optionList").split(",");
            int[] optionIdList = new int[temp.length];
            for (int i = 0; i < temp.length; i++) {
                optionIdList[i] = optionRecord.getId(temp[i]);
            }
            result = result && (roomDAO.insertRoomOption(roomId, optionIdList) > 0);
        }
        System.out.println("option"+result);
        System.out.println(hashtagExist);
        if (hashtagExist.equals("Y")) {
            String[] hashtagList = roomInfo.get("hashtagList").split(",");
            System.out.println(hashtagList);
            result = result && (roomDAO.insertRoomHashtag(roomId, hashtagList) > 0);
        }
        System.out.println("hash"+result);
//        String[] imgUrlList = roomInfo.get("imgUrlList").split(",");
//        roomDAO.insertRoomImage(roomId, imgUrlList);
        if (result == false) return roomDAO.FAIL;
        else return roomId;
    }

    @Override
    public int addImg(int roomId, ArrayList<String> imgUrlList) {
        return roomDAO.insertRoomImage(roomId, imgUrlList);
    }

    @Override
    public Map<String, Object> getRoomInfo(int roomId) {
        return roomDAO.selectRoomInfo(roomId);
    }

    @Override
    public List<String> getRoomOptions(int roomId) {
        Map<String, Integer> paramMap = new HashMap<>();
        paramMap.put("roomId", roomId);
        List<Integer> roomOptionsNum = roomDAO.selectRoomOptionByRoomId(paramMap);
        List<String> roomOptions = new ArrayList<>();
        for (int l : roomOptionsNum) {
            roomOptions.add(optionRecord.get(l));
        }
        return roomOptions;
    }

    @Override
    public int modifyRoom(Map<String, String> roomInfo) {
        if(roomInfo == null)
            return 0;

        int result = 1 ;
        String hashtagExist="Y";
        LocationVO locationVO = new LocationVO();
        RoomVO roomVO = new RoomVO();
        SaleInfoVO saleInfoVO = new SaleInfoVO();

        int roomId = Integer.parseInt(roomInfo.get("roomId"));
        int locationId = roomDAO.selectLocationIdByRoomId(roomId);
        locationVO.setId(locationId);

        if(roomInfo.get("isNotChangeAddr").equals("false")) {
            locationVO.setSido(roomInfo.get("sido"));
            locationVO.setSigungu(roomInfo.get("sigungu"));
            locationVO.setBname(roomInfo.get("bname"));
            locationVO.setBname1(roomInfo.get("bname1"));
            locationVO.setBname2(roomInfo.get("bname2"));
            locationVO.setJibun(roomInfo.get("jibun"));
            locationVO.setRoadName(roomInfo.get("roadName"));
            locationVO.setRoadJibun(roomInfo.get("roadJibun"));
            locationVO.setLatitude(new BigDecimal(roomInfo.get("latitude")));
            locationVO.setLongitude(new BigDecimal(roomInfo.get("longitude")));
        }
        locationVO.setDetailAddr(roomInfo.get("detailAddr"));

        roomVO.setId(roomId);
        roomVO.setLocationId(locationId);
        roomVO.setArea(Double.parseDouble(roomInfo.get("area")));
        roomVO.setFloor(Integer.parseInt(roomInfo.get("floor")));
        roomVO.setHeatType(heatingTypeRecord.getId(roomInfo.get("heatType")));
        roomVO.setRoomType(roomTypeRecord.getId(roomInfo.get("roomType")));

        int manageCost = roomInfo.get("manageCost").equals("") ? 0 : Integer.parseInt(roomInfo.get("manageCost"));
        saleInfoVO.setRoomId(roomId);
        saleInfoVO.setTitle(roomInfo.get("title"));
        saleInfoVO.setRentType(Integer.parseInt(roomInfo.get("rentType")));
        saleInfoVO.setPeriodNum(Integer.parseInt(roomInfo.get("periodNum")));
        saleInfoVO.setPeriodUnit(roomInfo.get("periodUnit").charAt(0)+"");
        //saleInfoVO.setPostType(Integer.parseInt(roomInfo.get("postType")));
        saleInfoVO.setDeposit(Integer.parseInt(roomInfo.get("deposit")));
        saleInfoVO.setMonthlyCost(Integer.parseInt(roomInfo.get("monthlyCost")));
        saleInfoVO.setManageCost(manageCost);

        switch (roomInfo.get("hashtagExist")){
            case "true":
                hashtagExist = "Y";
                break;
            case "false":
                hashtagExist = "N";
                break;
        }
        saleInfoVO.setHashtagExist(hashtagExist);
//        saleInfoVO.setWriteDate(new Date(0));
        // saleInfoVO.setViews(Integer.parseInt(roomInfo.get("views")));
        saleInfoVO.setDetailExplain(roomInfo.get("detailExplain"));
        saleInfoVO.setMemberId(Integer.parseInt(roomInfo.get("memberId")));

        result &= roomDAO.updateRoom(locationVO, roomVO, saleInfoVO, roomInfo.get("isNotChangeAddr"), roomInfo.get("isNotChangeDtAddr"));

        String[] temp;
        if(!roomInfo.get("manageIdList").equals("")) {
            temp = roomInfo.get("manageIdList").split(",");
            int[] manageIdList = new int[temp.length];

            for (int i = 0; i < temp.length; i++) {
                manageIdList[i] = manageCostRecord.getId(temp[i]);
            }
            result &= roomDAO.deleteManageCost(roomId, manageIdList);
            result &= roomDAO.insertRoomManageCost(roomId, manageIdList);
        }

        if (!roomInfo.get("optionList").equals("")) {
            temp = roomInfo.get("optionList").split(",");
            int[] optionIdList = new int[temp.length];
            for (int i = 0; i < temp.length; i++) {
                optionIdList[i] = optionRecord.getId(temp[i]);
            }
            result &= roomDAO.deleteOption(roomId, optionIdList);
            result &= roomDAO.insertRoomOption(roomId, optionIdList);
        }

        String[] hashtagList=null;
        if(roomInfo.get("hashtagList") != null) {
            hashtagList = roomInfo.get("hashtagList").split(",");
            result &= roomDAO.deleteHashtag(roomId, hashtagList);
            result &= roomDAO.insertRoomHashtag(roomId, hashtagList);
        }

//        String[] imageList=null;
//        System.out.println("Service: imageList");
//        if(roomInfo.get("imageList") != null){
//            String[] imgUrlList = roomInfo.get("imageList").split(",");
//            result &= roomDAO.deleteRoomImage(roomId, imgUrlList);
//            System.out.println("방 이미지 삭제");
//            result &= roomDAO.insertRoomImage(roomId, imgUrlList);
//            System.out.println("방 이미지 추가");
//        }
        return result;
    }

    @Override
    public int modifyViews(int roomId, int views) {
        Map<String, Integer> paramMap = new HashMap<>();
        paramMap.put("roomId", roomId);
        paramMap.put("views", views);
        return roomDAO.updateViews(paramMap);
    }

    @Override
    public int modifyPostType(int roomId, String postType) {
        Map<String, Integer> paramMap = new HashMap<>();
        int postId = postStatusRecord.getId(postType);
        paramMap.put("roomId", roomId);
        paramMap.put("postId", postId);
        if(roomDAO.updatePostType(paramMap) > 0)
            return postId;
        else
            return 0;
    }


    @Override
    public int removeRoom(int roomId) {
        return roomDAO.deleteRoom(roomId);
    }

    private List<RoomSummaryViewVO> convertVoToViewVo(List<RoomSummaryVO> voList){
        if(voList == null)
            return null;

        List<RoomSummaryViewVO> beanList = new ArrayList<>();
        RoomSummaryVO roomSummaryVO;

        for (int i = 0; i < voList.size(); i++) {
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
            roomSummaryViewVO.setDeposit(roomSummaryVO.getDeposit() / 10000);
            roomSummaryViewVO.setMonthlyCost(roomSummaryVO.getMonthlyCost() / 10000);
            roomSummaryViewVO.setManageCost(roomSummaryVO.getManageCost() / 10000);
            roomSummaryViewVO.setWriteDate(roomSummaryVO.getSaleDate());
            roomSummaryViewVO.setViews(roomSummaryVO.getViews());
            roomSummaryViewVO.setRoomImg(roomSummaryVO.getRoomImg());
            roomSummaryViewVO.setSido(roomSummaryVO.getSido());
            roomSummaryViewVO.setSigungu(roomSummaryVO.getSigungu());
            roomSummaryViewVO.setRoadname(roomSummaryVO.getRoadname());
            roomSummaryViewVO.setPeriodNum(roomSummaryVO.getPeriodNum());
            if(roomSummaryVO.getPeriodUnit().equals("Y")) {
                roomSummaryViewVO.setPeriodUnit("년");
            } else if(roomSummaryVO.getPeriodUnit().equals("M")) {
                roomSummaryViewVO.setPeriodUnit("개월");
            } else if(roomSummaryVO.getPeriodUnit().equals("W")) {
                roomSummaryViewVO.setPeriodUnit("주");
            }
            beanList.add(roomSummaryViewVO);
        }
        return beanList;
    }

    private RoomDetailViewVO convertVoToViewVo(RoomDetailVO roomDetailVO){
        if(roomDetailVO == null)
            return null;

        RoomDetailViewVO bean = new RoomDetailViewVO();

        bean.setRoomId(roomDetailVO.getRoomId());
        bean.setMemberId(roomDetailVO.getMemberId());
        bean.setArea(roomDetailVO.getArea());
        bean.setFloor(roomDetailVO.getFloor());
        bean.setHeatType(heatingTypeRecord.get(roomDetailVO.getHeatType()));
        bean.setRoomType(roomTypeRecord.get(roomDetailVO.getRoomType()));
        bean.setTitle(roomDetailVO.getTitle());
        bean.setRentType(rentTypeRecord.get(roomDetailVO.getRentType()));
        bean.setPeriodNum(roomDetailVO.getPeriodNum());
        bean.setPeriodUnit(roomDetailVO.getPeriodUnit());
        bean.setPostType(postStatusRecord.get(roomDetailVO.getPostType()));
        bean.setDeposit(roomDetailVO.getDeposit());
        bean.setMonthlyCost(roomDetailVO.getMonthlyCost());
        bean.setManageCost(roomDetailVO.getManageCost());
        List<String> temp = new ArrayList<String>();
        for(Integer it: roomDetailVO.getManages()) {
            temp.add(manageCostRecord.get(it));
        }
        bean.setManages(temp);
        List<String> temp2 = new ArrayList<String>();
        for(Integer it: roomDetailVO.getOptions()) {
            temp2.add(optionRecord.get(it));
        }
        bean.setOptions(temp2);

        bean.setHashtagExist(roomDetailVO.isHashtagExist());
        bean.setHashtags(roomDetailVO.getHashtags());
        bean.setViews(roomDetailVO.getViews());
        bean.setDetailExplain(roomDetailVO.getDetailExplain());
        bean.setWriteDate(roomDetailVO.getWriteDate());
        bean.setRoomImg(roomDetailVO.getRoomImg());
        bean.setSido(roomDetailVO.getSido());
        bean.setSigungu(roomDetailVO.getSigungu());
        bean.setBname(roomDetailVO.getBname());
        bean.setBname1(roomDetailVO.getBname1());
        bean.setBname2(roomDetailVO.getBname2());
        bean.setJibun(roomDetailVO.getJibun());
        bean.setRoadName(roomDetailVO.getRoadname());
        bean.setRoadJibun(roomDetailVO.getRoadJibun());
        bean.setDetailAddr(roomDetailVO.getDetailAddr());

        return bean;
    }

    @Override
    public int getRoomIdByMemberId(int memberId){
        return roomDAO.selectRoomIdByMemberId(memberId);
    }

    @Override
    public int modifyImg(int roomId, ArrayList<String> imgUrlList) {
        int imgCnt = roomDAO.selectImgCntByRoomId(roomId);
        if(imgCnt != 0){
            roomDAO.deleteRoomImage(roomId);
        }
        return roomDAO.insertRoomImage(roomId, imgUrlList);
    }

    @Override
    public int modifyMultiPostType(Map<String, Object> idMap) {
        return roomDAO.updateMultiPostType(idMap);
    }
}
