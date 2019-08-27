package com.murmuler.organicstack.controller;

import com.murmuler.organicstack.service.ContractService;
import com.murmuler.organicstack.service.MemberService;
import com.murmuler.organicstack.service.MypageService;
import com.murmuler.organicstack.vo.ContractVO;
import com.murmuler.organicstack.vo.MemberVO;
import com.murmuler.organicstack.vo.RoomSummaryViewVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/mypage")
public class MypageController {
    private Log logger = LogFactory.getLog(MainController.class);

    @Autowired
    private MypageService mypageService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private ContractService contractService;

    @RequestMapping(value ="/recent", method = RequestMethod.GET)
    public ModelAndView recentListRoom(HttpServletRequest request) {
        HttpSession session = request.getSession();
        MemberVO memberVO = (MemberVO)session.getAttribute("loginMember");
        ModelAndView mav = new ModelAndView();
        if(memberVO == null){
            mav.setViewName("redirect:/");
        } else {
            List<Integer> recentRoomIds = (List<Integer>) session.getAttribute("recentRoom");
            List<RoomSummaryViewVO> roomList = null;
            if (recentRoomIds != null) {
                roomList = mypageService.getRecentRoom(recentRoomIds);
            }
            List<Integer> likeRoomList = mypageService.getLikeRoomNumber(memberVO.getMemberId());
            mav.addObject("roomArray", roomList);
            mav.addObject("likeList", likeRoomList);
            mav.setViewName("recentList");
        }
        return mav;
    }

    @RequestMapping(value ="/recent", method = RequestMethod.POST)
    public void recentListRoomLikeButton(@RequestParam int roomId,
                                         @RequestParam boolean flag,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        MemberVO memberVO = (MemberVO) session.getAttribute("loginMember");
        JSONObject data = new JSONObject();
        if(memberVO == null) {
            data.put("res", "FAIL");
        } else {
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
        }
        response.setContentType("text/html; charset=utf-8;");
        response.getWriter().print(data);
    }

    @RequestMapping(value = "/like", method = RequestMethod.GET)
    public ModelAndView likeListRoom(HttpServletRequest request){
        HttpSession session = request.getSession();
        MemberVO memberVO = (MemberVO) session.getAttribute("loginMember");
        ModelAndView mav = new ModelAndView();
        if(memberVO == null) {
            mav.setViewName("redirect:/");
        } else {
            int memberId = memberVO.getMemberId();
            List<RoomSummaryViewVO> roomList = mypageService.getLikeRoom(memberId);
            mav.addObject("roomArray", roomList);
            mav.setViewName("likeList");
        }

        return mav;
    }

    @RequestMapping(value = "/like", method = RequestMethod.POST)
    public void likeListRoomButton(@RequestParam int roomId,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        MemberVO memberVO = (MemberVO) session.getAttribute("loginMember");
        JSONObject data = new JSONObject();
        if(memberVO == null) {
            data.put("res", "FAIL");
        } else {
            int memberId = memberVO.getMemberId();
            int res = mypageService.removeLikeRoom(memberId, roomId);
            if (res > 0) {
                data.put("res", "SUCCESS");
            } else {
                data.put("res", "FAIL");
            }
        }
        response.setContentType("text/html; charset=utf-8;");
        response.getWriter().print(data);
    }

    @RequestMapping("/contract")
    public ModelAndView contractManage(HttpServletRequest request){
        logger.info("my contract manage entered...");
        ModelAndView mav = new ModelAndView();
        MemberVO memberVO = (MemberVO) request.getSession().getAttribute("loginMember");
        if(memberVO != null) {
            List<ContractVO> contracts = contractService.getMyContracts(memberVO.getMemberId());
//            System.out.println(contracts);
            mav.addObject("contracts", contracts);
            mav.setViewName("myContractList");
        }
        else {
            mav.setViewName("redirect:/");
        }
        return mav;
    }

    @RequestMapping("/contract/view")
    public ModelAndView showContractImage(@RequestParam int contractId,
                                          HttpServletRequest request){
        logger.info("show contract image entered...");
        ModelAndView mav = new ModelAndView();
        MemberVO memberVO = (MemberVO) request.getSession().getAttribute("loginMember");
        if(memberVO == null) {  // 세션이 없으면 에러 페이지 반환
            mav.setViewName("error");
            return mav;
        }
        int memberId = memberVO.getMemberId();
        if(contractService.isMyContract(memberId, contractId)) {    // 내 계약서가 맞을 때
            String image = contractService.getContractImageById(contractId);
            mav.setViewName("myContractView");
            mav.addObject("contractId", contractId);
            mav.addObject("image", image);
        }
        else {  // 내 계약서가 아니면 에러 페이지 반환
            mav.setViewName("error");
            return mav;
        }

        return mav;
    }

    @RequestMapping(value = "/personal-info", method = RequestMethod.GET)
    public ModelAndView personalInfo(HttpServletRequest request){
        MemberVO memberVO = (MemberVO) request.getSession().getAttribute("loginMember");
        ModelAndView modelAndView = new ModelAndView();
        if(memberVO == null){
            modelAndView.setViewName("redirect:/");
        }
        else {
            String email = memberVO.getEmail();
            String[] emailData = email.split("@");
            String phone = memberVO.getPhone();
            String[] phoneData = phone.split("-");
            modelAndView.addObject("realname", memberVO.getName());
            modelAndView.addObject("id", memberVO.getId());
            modelAndView.addObject("nickname", memberVO.getNickname());
            modelAndView.addObject("emailId", emailData[0]);
            modelAndView.addObject("domain", emailData[1]);
            modelAndView.addObject("phone1", phoneData[0]);
            modelAndView.addObject("phone2", phoneData[1]);
            modelAndView.addObject("phone3", phoneData[2]);
            modelAndView.setViewName("personalInfo");
        }

        return modelAndView;
    }

    @RequestMapping(value = "/personal-info", method = RequestMethod.POST)
    public void updatePersonalInfo(@RequestParam String realname,
                                   @RequestParam String nickname,
                                   @RequestParam String email,
                                   @RequestParam String phone,
                                   @RequestParam String pwd,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws IOException {
        logger.info("update pi method entered....");
        HttpSession session = request.getSession();
        MemberVO memberVO = (MemberVO) session.getAttribute("loginMember");
        JSONObject data = new JSONObject();
        if (memberVO == null) {
            data.put("updateResult", "FAIL");
        }
        else if (!pwd.equals(memberVO.getPwd())) {
            data.put("updateResult", "WRONG_PWD");
        }
        else {
            int memberId = memberVO.getMemberId();
            int res = memberService.changeMemberInfo(memberId, realname, nickname, email, phone);
            if (res > 0) {
                memberVO.setName(realname);
                memberVO.setNickname(nickname);
                memberVO.setEmail(email);
                memberVO.setPhone(phone);
                session.setAttribute("loginMember", memberVO);
                data.put("updateResult", "SUCCESS");
            } else{
                data.put("updateResult", "FAIL");
            }
        }

        response.setContentType("text/html; charset=utf-8;");
        response.getWriter().print(data);
    }

    @RequestMapping("/change-pwd")
    public String changePwd(){
        return "changePwd";
    }
}
