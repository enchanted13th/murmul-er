package com.murmuler.organicstack.controller;

import com.murmuler.organicstack.service.MemberService;
import com.murmuler.organicstack.service.RoomService;
import com.murmuler.organicstack.vo.MemberVO;
import com.murmuler.organicstack.vo.RoomDetailViewVO;
import com.murmuler.organicstack.vo.RoomSummaryViewVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;


@Controller
@RequestMapping("/contract")
public class ContractController {
    Log logger = LogFactory.getLog(ContractController.class);
//    @Autowired
//    private ContractService contractService;
    @Autowired
    private RoomService roomService;
    @Autowired
    private MemberService memberService;

    @RequestMapping("")
    public ModelAndView showMyRoom(@RequestParam int jeonchaId,
                                   HttpServletRequest request){
        MemberVO member = (MemberVO)request.getSession().getAttribute("loginMember");

        List<RoomSummaryViewVO> myRoom = roomService.getMyRooms(member.getMemberId());

        ModelAndView mav = new ModelAndView();
        mav.setViewName("contractSelectRoom");
        mav.addObject("jeonchaId", jeonchaId);
        mav.addObject("myRoom", myRoom);
        return mav;
    }


    @RequestMapping(value = "/write")
    public ModelAndView showContractForm(@RequestParam int jeonchaId,
                                         @RequestParam int roomId,
                                         HttpServletRequest request){
        MemberVO jeondaeMember = (MemberVO)request.getSession().getAttribute("loginMember");
        MemberVO jeonchaMember = memberService.getMemberById(jeonchaId+"");
        String jeondaeName = jeondaeMember.getName();
        String jeonchaName = jeonchaMember.getName();

        Map<String, Object> roomInfo = roomService.getRoomInfo(roomId);
        ModelAndView mav = new ModelAndView();
        mav.setViewName("contractForm");
        mav.addObject("jeondaeName", jeondaeName);
        mav.addObject("jeonchaName", jeonchaName);
        mav.addObject("roomInfo", roomInfo);
        mav.addObject("roomId", roomId);

        return mav;
}

    @RequestMapping(value = "/show", method= RequestMethod.POST)
    public ModelAndView showContractImage(@RequestParam int roomId,
                                          @RequestParam String jeondaeName,
                                          @RequestParam String jeonchaName,
                                          @RequestParam String buildingName,
                                          @RequestParam String buildingArea,
                                          @RequestParam String buildingStructure,
                                          @RequestParam String house,
                                          @RequestParam String jeondaeBubun,
                                          @RequestParam String jeondaeUsage,
                                          @RequestParam String rentType,
                                          @RequestParam String deposit,
                                          @RequestParam String contractPayment,
                                          @RequestParam String middlePayment,
                                          @RequestParam String mdPayYear,
                                          @RequestParam String mdPayMonth,
                                          @RequestParam String mdPayDay,
                                          @RequestParam String remainderPayment,
                                          @RequestParam String remainderYear,
                                          @RequestParam String remainderMonth,
                                          @RequestParam String remainderDay,
                                          @RequestParam String monthlyCost,
                                          @RequestParam String mcPayDayS,
                                          @RequestParam String mcType,
                                          @RequestParam String fromYearS,
                                          @RequestParam String fromMonthS,
                                          @RequestParam String fromDayS,
                                          @RequestParam String toYearS,
                                          @RequestParam String toMonthS,
                                          @RequestParam String toDayS,
                                          @RequestParam String depositL,
                                          @RequestParam String monthlyCostL,
                                          @RequestParam String lessorName,
                                          @RequestParam String fromYearL,
                                          @RequestParam String fromMonthL,
                                          @RequestParam String fromDayL,
                                          @RequestParam String toYearL,
                                          @RequestParam String toMonthL,
                                          @RequestParam String toDayL) {
        logger.info("show image method entered....");

        ModelAndView mav = new ModelAndView();
        Map<String, String> contractData = new HashMap<>();
        Map<String, Integer> mRoomId = new HashMap<>();
        Date date = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

        String[] today = format.format(date).split("-");
        String year = today[0];
        String month = today[1];
        String day = today[2];
//        System.out.println(roomId);
        mRoomId.put("roomId", roomId);
//        mRoomId.put("roomId", 27);
        RoomDetailViewVO roomInfo = roomService.getRoomDetailByRoomId(mRoomId);
//        System.out.println(roomInfo);
        String sido = roomInfo.getSido() + " ";
        String sigungu = roomInfo.getSigungu() + " ";
        String bname1 = roomInfo.getBname1();
        bname1 = (bname1 == null) ? "" : bname1 + " ";
        String roadName = roomInfo.getRoadName() + " ";
        String roadJibun = roomInfo.getRoadJibun();
        String roadAddress = sido + sigungu + bname1 + roadName + roadJibun;
//        System.out.println(roadAddress);

        String area = roomInfo.getArea() +"";
        String manageCost = roomInfo.getManageCost()+"";
        String manages = roomInfo.getManages().toString();
        String options = roomInfo.getOptions().toString();

//        System.out.println(manageCost);
//        System.out.println(manages);
//        System.out.println(options);
//

        contractData.put("jeondaeName", jeondaeName);
        contractData.put("jeonchaName", jeonchaName);
        contractData.put("roadAddress", roadAddress);
        contractData.put("jeondaeArea", area);
        contractData.put("manageCost", manageCost);
        contractData.put("manages", manages);
        contractData.put("options", options);
        contractData.put("buildingName", buildingName);
        contractData.put("buildingArea", buildingArea);
        contractData.put("buildingStructure", buildingStructure);
        contractData.put("house", house);
        contractData.put("jeondaeBubun", jeondaeBubun);
        contractData.put("jeondaeUsage", jeondaeUsage);
        contractData.put("rentType", rentType);
        contractData.put("deposit", deposit);
        contractData.put("contractPayment", contractPayment);
        contractData.put("middlePayment", middlePayment);
        contractData.put("mdPayYear", mdPayYear);
        contractData.put("mdPayMonth", mdPayMonth);
        contractData.put("mdPayDay", mdPayDay);
        contractData.put("remainderPayment", remainderPayment);
        contractData.put("remainderYear", remainderYear);
        contractData.put("remainderMonth", remainderMonth);
        contractData.put("remainderDay", remainderDay);
        contractData.put("monthlyCost", monthlyCost);
        contractData.put("mcPayDayS", mcPayDayS);
        contractData.put("mcType", mcType);
        contractData.put("fromYearS", fromYearS);
        contractData.put("fromMonthS", fromMonthS);
        contractData.put("fromDayS", fromDayS);
        contractData.put("toYearS", toYearS);
        contractData.put("toMonthS", toMonthS);
        contractData.put("toDayS", toDayS);
        contractData.put("depositL", depositL);
        contractData.put("monthlyCostL", monthlyCostL);
        contractData.put("lessorName", lessorName);
        contractData.put("fromYearL", fromYearL);
        contractData.put("fromMonthL", fromMonthL);
        contractData.put("fromDayL", fromDayL);
        contractData.put("toYearL", toYearL);
        contractData.put("toMonthL", toMonthL);
        contractData.put("toDayL", toDayL);
        contractData.put("todayYear", year);
        contractData.put("todayMonth", month);
        contractData.put("todayDay", day);

        mav.setViewName("contractImage");
        mav.addObject("contractData", contractData);

        return mav;
    }

//    @RequestMapping(value = "/toimage", method = RequestMethod.POST)
//    public void download(ModelMap modelMap, HttpServletRequest request, HttpServletResponse response) {
//        try {
//            String imgData = request.getParameter("imgData");
//            imgData = imgData.replaceAll("data:image/png;base64,", "");
//
//            byte[] file = Base64.decodeBase64(imgData);
//            ByteArrayInputStream is = new ByteArrayInputStream(file);
//
//            response.setContentType("image/png");
//            response.setHeader("Content-Disposition", "attachment; filename=contract.png");
//
//            IOUtils.copy(is, response.getOutputStream());
//            response.flushBuffer();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
}
