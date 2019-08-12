package com.murmuler.organicstack.controller;

import com.murmuler.organicstack.service.RoomService;
import com.murmuler.organicstack.util.PostStatusRecord;
import com.murmuler.organicstack.vo.MemberVO;

import com.murmuler.organicstack.vo.RoomSummaryViewVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/manage")
public class RoomController {
    private Log logger = LogFactory.getLog(RoomController.class);

    @Autowired
    private RoomService roomService;
    /* ----- 내 방 관리 ----- */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public ModelAndView myRoomList(HttpServletRequest request) {
        logger.info("called manage method");

        HttpSession session = request.getSession();
        MemberVO member = (MemberVO) session.getAttribute("loginMember");
        logger.info(member);
        List<RoomSummaryViewVO> list = null;
        if(member!=null) {
            int memberId = member.getMemberId();
            list = roomService.getMyRooms(memberId);
        }
        ModelAndView mav = new ModelAndView();
        mav.setViewName("manage/manageRoom");
        mav.addObject("myRooms", list);
        return mav;
    }

    /* ----- 내 방 등록 ----- */
    @RequestMapping(value = "/room", method = RequestMethod.GET)
    public String showRoomForm() {
        return "manage/registerRoom";
    }

    /* ----- 내 방 등록 -> 내 방 관리 ----- */
    @RequestMapping(value = "/room", method = RequestMethod.POST)
    public void registerRoom(@RequestParam String allAddr,
                             @RequestParam String detailAddr,
                             @RequestParam String area,
//                               @RequestParam String floor,
                             @RequestParam String periodNum,
                             @RequestParam String periodUnit,
                             @RequestParam String deposit,
                             @RequestParam String price,
                             @RequestParam String priceType,
                             @RequestParam String adminFee,
                             @RequestParam String adminFeeList,
                             @RequestParam String roomType,
                             @RequestParam String heatType,
                             @RequestParam String animal,
                             @RequestParam String parking,
                             @RequestParam String elevator,
                             @RequestParam String optionList,
                             @RequestParam String title,
                             @RequestParam String detail,
                             @RequestParam String hashtagExist,
                             @RequestParam String hashTagList,
                             @RequestParam String images,
                             HttpServletRequest request,
                             HttpServletResponse response) throws IOException {
        logger.info("called add method");
        Map<String, String> roomInfo = new HashMap<>();
        JSONParser parser = new JSONParser();
        JSONObject addrInfo = new JSONObject();
        JSONObject res = new JSONObject();
        try {
            addrInfo = (JSONObject) parser.parse(allAddr);
            System.out.println("addrInfo : "+addrInfo);
        } catch (Exception e) {}
        roomInfo.put("sido", (String) addrInfo.get("sido"));
        roomInfo.put("sigungu", (String) addrInfo.get("sigungu"));
        roomInfo.put("bname", (String) addrInfo.get("bname"));
        roomInfo.put("bname1", (String) addrInfo.get("bname1"));
        roomInfo.put("bname2", (String) addrInfo.get("bname2"));
        roomInfo.put("roadName", (String) addrInfo.get("roadname"));
        String[] jibunAddress;
        if(!addrInfo.get("jibunAddressEnglish").equals("")){
            jibunAddress = addrInfo.get("jibunAddressEnglish").toString().split(",");
        } else {
            jibunAddress = addrInfo.get("autoJibunAddressEnglish").toString().split(",");
        }
        String[] roadAddress = addrInfo.get("roadAddressEnglish").toString().split(",");
        roomInfo.put("jibun", jibunAddress[0]);
        roomInfo.put("roadJibun", roadAddress[0]);
        roomInfo.put("latitude", (String) addrInfo.get("latitude"));
        roomInfo.put("longitude", (String) addrInfo.get("longitude"));
        roomInfo.put("detailAddr", detailAddr);
        roomInfo.put("area", area);
//        roomInfo.put("floor", floor);
        roomInfo.put("periodNum", periodNum);
        roomInfo.put("periodUnit", periodUnit);
        roomInfo.put("deposit", deposit);
        roomInfo.put("monthlyCost", price);
        roomInfo.put("rentType", priceType);
        roomInfo.put("manageCost", adminFee);
        roomInfo.put("manageList", adminFeeList);
        roomInfo.put("heatType", heatType);
        roomInfo.put("roomType", roomType);
        roomInfo.put("animal", animal);
        roomInfo.put("parking", parking);
        roomInfo.put("elevator", elevator);
        roomInfo.put("optionList", optionList);
        roomInfo.put("title", title);
        roomInfo.put("detailExplain", detail);
        roomInfo.put("hashtagExist", hashtagExist);
        roomInfo.put("hashTagList", hashTagList);
        MemberVO member = (MemberVO) request.getSession().getAttribute("loginMember");
        roomInfo.put("memberId", member.getMemberId()+"");

        if(roomService.addRoom(roomInfo) > 0) {
            res.put("registerResult", "SUCCESS");
            System.out.println("SUCCESS");
        }
        else {
            res.put("registerResult", "FAIL");
            System.out.println("FAIL");
        }
        response.setContentType("application/json; charset=utf-8");
        response.getWriter().print(res);
        //return "redirect:/manage";
    }

    /* ----- 내 방 관리 -> 수정 -> 내 방 관리 ----- */
    @RequestMapping(value = "/room/update", method = RequestMethod.POST)
    public void alterRoom(@RequestParam String roomId,
                            @RequestParam String allAddr,
                            @RequestParam String detailAddr,
                            @RequestParam String area,
//                               @RequestParam String floor,
                            @RequestParam String periodNum,
                            @RequestParam String periodUnit,
                            @RequestParam String deposit,
                            @RequestParam String price,
                            @RequestParam String priceType,
                            @RequestParam String adminFee,
                            @RequestParam String adminFeeList,
                            @RequestParam String roomType,
                            @RequestParam String heatType,
                            @RequestParam String animal,
                            @RequestParam String parking,

                            @RequestParam String optionList,
                            @RequestParam String title,
                            @RequestParam String detail,
                            @RequestParam String hashtagExist,
                            @RequestParam String hashtagList,
                            @RequestParam String imageList,
                            @RequestParam String isNotChangeAddr,
                            HttpServletRequest request,
                            HttpServletResponse response) throws IOException {

        logger.info("called update method");
        Map<String, String> roomInfo = new HashMap<>();
        JSONParser parser = new JSONParser();
        JSONObject addrInfo = new JSONObject();
        JSONObject res = new JSONObject();
        roomInfo.put("roomId", roomId);
        if(isNotChangeAddr.equals("false")) {
            try {
                addrInfo = (JSONObject) parser.parse(allAddr);

            } catch (Exception e) {
            }
            roomInfo.put("sido", (String) addrInfo.get("sido"));
            roomInfo.put("sigungu", (String) addrInfo.get("sigungu"));
            roomInfo.put("bname", (String) addrInfo.get("bname"));
            roomInfo.put("bname1", (String) addrInfo.get("bname1"));
            roomInfo.put("bname2", (String) addrInfo.get("bname2"));
            roomInfo.put("roadName", (String) addrInfo.get("roadname"));
            String[] jibunAddress;
            if (!addrInfo.get("jibunAddressEnglish").equals("")) {
                jibunAddress = addrInfo.get("jibunAddressEnglish").toString().split(",");
            } else {
                jibunAddress = addrInfo.get("autoJibunAddressEnglish").toString().split(",");
            }

            String[] roadAddress = addrInfo.get("roadAddressEnglish").toString().split(",");
            roomInfo.put("jibun", jibunAddress[0]);
            roomInfo.put("roadJibun", roadAddress[0]);
            roomInfo.put("latitude", (String) addrInfo.get("latitude"));
            roomInfo.put("longitude", (String) addrInfo.get("longitude"));
            roomInfo.put("detailAddr", detailAddr);
        }
        roomInfo.put("area", area);
        roomInfo.put("isNotChangeAddr", isNotChangeAddr);
//        roomInfo.put("floor", floor);
        roomInfo.put("periodNum", periodNum);
        roomInfo.put("periodUnit", periodUnit);
        roomInfo.put("deposit", deposit);
        roomInfo.put("monthlyCost", price);
        roomInfo.put("rentType", priceType);
        roomInfo.put("manageCost", adminFee);
        roomInfo.put("manageIdList", adminFeeList);
        roomInfo.put("heatType", heatType);
        roomInfo.put("roomType", roomType);
        roomInfo.put("animal", animal);
        roomInfo.put("parking", parking);

        roomInfo.put("optionList", optionList);
        roomInfo.put("title", title);
        roomInfo.put("detailExplain", detail);
        roomInfo.put("hashtagExist", hashtagExist);
        roomInfo.put("hashtagList", hashtagList);
        roomInfo.put("imageList", imageList);
        MemberVO member = (MemberVO) request.getSession().getAttribute("loginMember");
        roomInfo.put("memberId", member.getMemberId()+"");

        if(roomService.modifyRoom(roomInfo) >= 0) {
            res.put("updateResult", "SUCCESS");
            System.out.println("SUCCESS");
        }
        else {
            res.put("updateResult", "FAIL");
            System.out.println("FAIL");
            
        }

        response.setContentType("application/json; charset=utf-8");
        response.getWriter().print(res);
//        return "redirect:/manage";
    }

    @RequestMapping(value = "/update/{roomId}", method = RequestMethod.GET)
    public ModelAndView updateRoom(@PathVariable int roomId){

        Map<String, Object> room = roomService.getRoomInfo(roomId);

        ModelAndView mav = new ModelAndView();
        mav.setViewName("/manage/updateRoom");
        mav.addObject("room", room);
        mav.addObject("roomId", roomId);
        return mav;
    }

    /* ----- 내 방 관리 -> 삭제 -> 내 방 관리 ----- */
    @RequestMapping(value = "/room", method = RequestMethod.DELETE)
    public String eraseRoom(@RequestParam(value = "roomId") int roomId) {
        roomService.removeRoom(roomId);
        return "redirect:/manage";
    }

    @RequestMapping(value = "/post-status", method = RequestMethod.POST)
    public void changePost(@RequestParam int roomId,
                           @RequestParam String postType,
                           HttpServletResponse response) throws IOException {
        logger.info(String.format("changePost method entered... ri: %d, pt: %s", roomId, postType));
        JSONObject res = new JSONObject();
        int result = roomService.modifyPostType(roomId, postType);
        switch (result) {
            case PostStatusRecord.POST_UPDATE_FAIL :
              res.put("result", "UPDATE_FAIL");
              break;
            case PostStatusRecord.POST_POSTING :
              res.put("result", "POSTING");
              break;
            case PostStatusRecord.POST_END_POSTING :
              res.put("result", "END_POSTING");
              break;
            case PostStatusRecord.POST_DEAL_COMPLETE :
              res.put("result", "DEAL_COMPLETE");
              break;
            case PostStatusRecord.POST_NO_POSTING :
              res.put("result", "NO_POSTING");
              break;
        }
        response.setContentType("application/json; charset=utf-8");
        response.getWriter().print(res);
    }

}
