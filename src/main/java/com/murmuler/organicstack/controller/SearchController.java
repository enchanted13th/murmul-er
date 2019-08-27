package com.murmuler.organicstack.controller;

import com.murmuler.organicstack.service.ContactService;
import com.murmuler.organicstack.service.MypageService;
import com.murmuler.organicstack.service.RoomService;

import com.murmuler.organicstack.util.OptionRecord;
import com.murmuler.organicstack.vo.MemberVO;
import com.murmuler.organicstack.vo.RoomDetailViewVO;
import com.murmuler.organicstack.vo.RoomSummaryViewVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/searchRoom")
public class SearchController {
    private Log logger = LogFactory.getLog(RoomController.class);

    @Autowired
    private RoomService roomService;

    @Autowired
    private MypageService mypageService;

    @Autowired
    private ContactService contactService;

    @Autowired
    private OptionRecord optionRecord;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ModelAndView searchRoom() {
        ModelAndView mav = new ModelAndView();
        List<Map<Integer, String>> options = new ArrayList<>();
        for (int key : optionRecord.keySet()) {
            Map<Integer, String> ops = new HashMap<>();
            ops.put(key, optionRecord.get(key));
            options.add(ops);
        }
        mav.addObject("options", options);
        mav.setViewName("search");
        return mav;
    }

    @RequestMapping(value = "/search", method = RequestMethod.GET)
    public void search(@RequestParam String southWest,
                       @RequestParam String northEast,
                       HttpServletResponse response) throws IOException {
        String[] temp = southWest.substring(1, southWest.length()-1).split(", ");
        BigDecimal south = new BigDecimal(temp[0]);
        BigDecimal west = new BigDecimal(temp[1]);
        temp = northEast.substring(1, northEast.length()-1).split(", ");
        BigDecimal north = new BigDecimal((temp[0]));
        BigDecimal east = new BigDecimal((temp[1]));

        response.setCharacterEncoding("UTF-8");
        JSONObject roomListObject = new JSONObject();
        JSONObject roomInfo = new JSONObject();

        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("south", south);
        paramMap.put("west", west);
        paramMap.put("north", north);
        paramMap.put("east", east);
        List<RoomSummaryViewVO> roomList = roomService.getRoomsByLocation(paramMap);

//        System.out.println(roomList);

        for (int i = 0; i < roomList.size(); i++) {
            roomInfo.put("roomId", "" + roomList.get(i).getRoomId());
            roomInfo.put("latitude", "" + roomList.get(i).getLatitude());
            roomInfo.put("longitude", "" + roomList.get(i).getLongitude());
            roomInfo.put("postType", roomList.get(i).getPostType());
            roomInfo.put("title", roomList.get(i).getTitle());
            roomInfo.put("address", roomList.get(i).getSido() + " " + roomList.get(i).getSigungu() + " " + roomList.get(i).getRoadname());
            roomInfo.put("period", roomList.get(i).getPeriodNum() + roomList.get(i).getPeriodUnit());
            roomInfo.put("roomType", roomList.get(i).getRoomType());
            roomInfo.put("rentType", roomList.get(i).getRentType());
            roomInfo.put("area", "" + roomList.get(i).getArea());
            roomInfo.put("deposit", roomList.get(i).getDeposit());
            roomInfo.put("monthlyCost", "" + roomList.get(i).getMonthlyCost());
            roomInfo.put("manageCost", "" + roomList.get(i).getManageCost());
            roomInfo.put("writeDate", roomList.get(i).getWriteDate());
            roomInfo.put("views", "" + roomList.get(i).getViews());
            roomInfo.put("roomImg", roomList.get(i).getRoomImg());
            roomInfo.put("roomOptions", roomService.getRoomOptions(roomList.get(i).getRoomId()));

            roomListObject.put("item" + i, "\"" + roomInfo + "\"");
        }
        if (roomList != null) {
            response.getWriter().print(roomListObject);
        } else {
            response.getWriter().print("EMPTY");
        }
    }

//    @RequestMapping(value = "/search", method = RequestMethod.GET)
//    public void search(@RequestParam String southWest,
//                       @RequestParam String northEast,
//                       HttpServletResponse response) throws IOException {
//        String[] temp = southWest.substring(1, southWest.length()-1).split(", ");
//        BigDecimal south = new BigDecimal(temp[0]);
//        BigDecimal west = new BigDecimal(temp[1]);
//        temp = northEast.substring(1, northEast.length()-1).split(", ");
//        BigDecimal north = new BigDecimal((temp[0]));
//        BigDecimal east = new BigDecimal((temp[1]));
//
//        response.setCharacterEncoding("UTF-8");
//        JSONObject roomListObject = new JSONObject();
//        JSONObject roomInfo = new JSONObject();
//
//        Map<String, Object> paramMap = new HashMap<>();
//        paramMap.put("south", south);
//        paramMap.put("west", west);
//        paramMap.put("north", north);
//        paramMap.put("east", east);
//        List<RoomSummaryViewVO> roomList = roomService.getRoomsByLocation(paramMap);
//
////        System.out.println(roomList);
//
//        for (int i = 0; i < roomList.size(); i++) {
//            roomInfo.put("roomId", "" + roomList.get(i).getRoomId());
//            roomInfo.put("latitude", "" + roomList.get(i).getLatitude());
//            roomInfo.put("longitude", "" + roomList.get(i).getLongitude());
//            roomInfo.put("postType", roomList.get(i).getPostType());
//            roomInfo.put("title", roomList.get(i).getTitle());
//            roomInfo.put("address", roomList.get(i).getSido() + " " + roomList.get(i).getSigungu() + " " + roomList.get(i).getRoadname());
//            roomInfo.put("period", roomList.get(i).getPeriodNum() + roomList.get(i).getPeriodUnit());
//            roomInfo.put("roomType", roomList.get(i).getRoomType());
//            roomInfo.put("rentType", roomList.get(i).getRentType());
//            roomInfo.put("area", "" + roomList.get(i).getArea());
//            roomInfo.put("deposit", roomList.get(i).getDeposit());
//            roomInfo.put("monthlyCost", "" + roomList.get(i).getMonthlyCost());
//            roomInfo.put("manageCost", "" + roomList.get(i).getManageCost());
//            roomInfo.put("writeDate", roomList.get(i).getWriteDate());
//            roomInfo.put("views", "" + roomList.get(i).getViews());
//            roomInfo.put("roomImg", roomList.get(i).getRoomImg());
//            roomInfo.put("roomOptions", roomService.getRoomOptions(roomList.get(i).getRoomId()));
//
//            roomListObject.put("item" + i, "\"" + roomInfo + "\"");
//        }
//        if (roomList != null) {
//            response.getWriter().print(roomListObject);
//        } else {
//            response.getWriter().print("EMPTY");
//        }
//    }

    @RequestMapping(value = "/{room_id}", method = RequestMethod.GET)
    public ModelAndView detail(@PathVariable("room_id") String roomId, HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("recentRoom") == null) {
            List<Integer> recentRoomList = new ArrayList<>();
            recentRoomList.add(Integer.parseInt(roomId));
            session.setAttribute("recentRoom", recentRoomList);
        } else {
            ((List<Integer>) session.getAttribute("recentRoom")).add(Integer.parseInt(roomId));
        }

        MemberVO memberVO = (MemberVO) session.getAttribute("loginMember");
        List<Integer> likeRoomList = new ArrayList<>();
        if (memberVO != null) {
            likeRoomList = mypageService.getLikeRoomNumber(memberVO.getMemberId());
        }

        ModelAndView mav = new ModelAndView();
        Map<String, Integer> paramMap = new HashMap<>();
        paramMap.put("roomId", Integer.parseInt(roomId));
        RoomDetailViewVO roomDetailViewVO = roomService.getRoomDetailByRoomId(paramMap);
        Map<String, String> sellerInfo = contactService.getSeller(roomDetailViewVO.getMemberId() + "");

        roomService.modifyViews(Integer.parseInt(roomId), roomDetailViewVO.getViews() + 1);

        mav.addObject("likeList", likeRoomList);

        mav.addObject("roomId", roomId);
        mav.addObject("area", roomDetailViewVO.getArea());
        mav.addObject("floor", roomDetailViewVO.getFloor());
        mav.addObject("heating", roomDetailViewVO.getHeatType());
        mav.addObject("roomType", roomDetailViewVO.getRoomType());
        mav.addObject("jibun", roomDetailViewVO.getJibun());

        mav.addObject("bname1", roomDetailViewVO.getBname1());
        mav.addObject("bname2", roomDetailViewVO.getBname2());
        mav.addObject("sido", roomDetailViewVO.getSido());
        mav.addObject("sigungu", roomDetailViewVO.getSigungu());
        mav.addObject("roadName", roomDetailViewVO.getRoadName());
        mav.addObject("roadJibun", roomDetailViewVO.getRoadJibun());
        mav.addObject("detailAddr", roomDetailViewVO.getDetailAddr());
        mav.addObject("writeDate", roomDetailViewVO.getWriteDate());
        mav.addObject("periodNum", roomDetailViewVO.getPeriodNum());
        mav.addObject("periodUnit", roomDetailViewVO.getPeriodUnit());
        mav.addObject("title", roomDetailViewVO.getTitle());
        mav.addObject("hashtags", roomDetailViewVO.getHashtags());
        mav.addObject("rentType", roomDetailViewVO.getRentType());
        mav.addObject("deposit", roomDetailViewVO.getDeposit());
        mav.addObject("monthlyCost", roomDetailViewVO.getMonthlyCost());
        mav.addObject("manageCost", roomDetailViewVO.getManageCost());
        mav.addObject("postType", roomDetailViewVO.getPostType());
        mav.addObject("roomImg", roomDetailViewVO.getRoomImg());
        mav.addObject("detail", roomDetailViewVO.getDetailExplain());
        mav.addObject("options", roomDetailViewVO.getOptions());
        mav.addObject("manages", roomDetailViewVO.getManages());
        mav.addObject("views", roomDetailViewVO.getViews());
        mav.addObject("memberId", roomDetailViewVO.getMemberId());
        mav.addObject("sellerNickname", sellerInfo.get("sellerNickname"));
        mav.addObject("sellerPhone", sellerInfo.get("sellerPhone"));

        mav.setViewName("roomDetail");
        return mav;
    }

    @RequestMapping(value = "/like", method = RequestMethod.POST)
    public void likeListRoomButton(@RequestParam int roomId,
                                   @RequestParam boolean flag,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        MemberVO memberVO = (MemberVO) session.getAttribute("loginMember");
        JSONObject data = new JSONObject();
        if (memberVO != null) {
            int memberId = memberVO.getMemberId();
            int res;
            if (flag) {
                res = mypageService.removeLikeRoom(memberId, roomId);
                if (res > 0) {
                    data.put("res", "REMOVE");
                } else {
                    data.put("res", "FAIL");
                }
            } else {
                res = mypageService.addLikeRoom(memberId, roomId);
                if (res > 0) {
                    data.put("res", "ADD");
                } else {
                    data.put("res", "FAIL");
                }
            }
        } else {
            data.put("res", "REQUIRED_LOGIN");
        }
        response.setContentType("application/json; charset=utf-8");
        response.getWriter().print(data);
    }
}
