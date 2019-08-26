package com.murmuler.organicstack.controller;

import com.murmuler.organicstack.service.ContactService;
import com.murmuler.organicstack.service.MypageService;
import com.murmuler.organicstack.service.RoomService;
import com.murmuler.organicstack.util.OptionRecord;
import com.murmuler.organicstack.vo.MemberVO;
import com.murmuler.organicstack.vo.RoomDetailViewVO;
import com.murmuler.organicstack.vo.RoomMobileViewVO;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/mobile")
public class MobileController {
    private Log logger = LogFactory.getLog(MainController.class);

    @Autowired
    private MypageService mypageService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private ContactService contactService;

    @Autowired
    private OptionRecord optionRecord;

    @RequestMapping(value = "", method=RequestMethod.GET)
    public String login(){
        return "mobile/m_login";
    }

    @RequestMapping("/main")
    public String mobileHome(){
        logger.info("called mobile home method");
        return "mobile/m_main";
    }

    @RequestMapping(value = "/like/{memberId}", method = RequestMethod.GET)
    public String testLike(@PathVariable int memberId,
                           HttpServletRequest request) {
        List<RoomMobileViewVO> roomList = mypageService.getLikeRoomDetail(memberId);
        request.setAttribute("roomArray", roomList);
        return "mobile/m_likeList";
    }

    @RequestMapping(value = "/searchRoom/{room_id}", method = RequestMethod.GET)
    public ModelAndView detail(@PathVariable("room_id") String roomId,
                               @RequestParam(value = "flag", required = false, defaultValue = "false") boolean isActivity,
                               HttpServletRequest request) {
        logger.info("called search Room detail method");
        logger.info("is Activity : " + isActivity);

        ModelAndView mav = new ModelAndView();

        if(isActivity) {
            mav.addObject("isActivity", true);
        }
        HttpSession session = request.getSession();
        List<Integer> recentRoomList = (List<Integer>)session.getAttribute("recentRoom");
        if (recentRoomList == null) {
            recentRoomList = new ArrayList<>();
            recentRoomList.add(Integer.parseInt(roomId));
            session.setAttribute("recentRoom", recentRoomList);
        } else {
            recentRoomList.add(Integer.parseInt(roomId));
        }

        MemberVO memberVO = (MemberVO) session.getAttribute("loginMember");
        List<Integer> likeRoomList = new ArrayList<>();
        if (memberVO != null) {
            likeRoomList = mypageService.getLikeRoomNumber(memberVO.getMemberId());
        }

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

        mav.setViewName("mobile/m_roomDetail");
        return mav;
    }

    @RequestMapping(value = "/search", method = RequestMethod.GET)
    public void searchRoom(HttpServletResponse response) throws IOException {
        JSONObject res = new JSONObject();
        List<Map<Integer, String>> options = new ArrayList<>();
        for (int key : optionRecord.keySet()) {
            Map<Integer, String> ops = new HashMap<>();
            ops.put(key, optionRecord.get(key));
            options.add(ops);
        }
        res.put("options", options);
        response.setContentType("application/json; charset=utf-8");
        response.getWriter().print(res);
    }
}

















