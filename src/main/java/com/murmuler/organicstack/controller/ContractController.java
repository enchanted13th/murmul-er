package com.murmuler.organicstack.controller;

import com.murmuler.organicstack.service.ContractService;
import com.murmuler.organicstack.service.MemberService;
import com.murmuler.organicstack.service.RoomService;
import com.murmuler.organicstack.util.Constants;
import com.murmuler.organicstack.util.FileHelper;
import com.murmuler.organicstack.vo.ContractVO;
import com.murmuler.organicstack.vo.MemberVO;
import com.murmuler.organicstack.vo.RoomDetailViewVO;
import com.murmuler.organicstack.vo.RoomSummaryViewVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;


@Controller
@RequestMapping("/contract")
public class ContractController {
    Log logger = LogFactory.getLog(ContractController.class);
    private static final String REPO_PATH = Constants.REPOSITORY_PATH;
    @Autowired
    private RoomService roomService;
    @Autowired
    private MemberService memberService;
    @Autowired
    private ContractService contractService;

    @RequestMapping("/select")
    public ModelAndView showMyRoom(@RequestParam int contactId,
                                   @RequestParam String forwhat,
                                   HttpServletRequest request){
        MemberVO member = (MemberVO)request.getSession().getAttribute("loginMember");
        List<RoomSummaryViewVO> myRoom = roomService.getMyPostingRoom(member.getMemberId());

        ModelAndView mav = new ModelAndView();
        if(forwhat == null) {
            mav.setViewName("redirect:/");
            return mav;
        }
        switch (forwhat) {
            case "write":
                mav.setViewName("contractWriteSelectRoom");
                break;
            case "register":
                mav.setViewName("contractRegisterSelectRoom");
                break;
        }
        mav.addObject("contactId", contactId);
        mav.addObject("myRoom", myRoom);
        return mav;
    }

    @RequestMapping(value = "/write")
    public ModelAndView showContractForm(@RequestParam int contactId,
                                         @RequestParam int roomId,
                                         HttpServletRequest request){
        MemberVO jeondaeMember = (MemberVO)request.getSession().getAttribute("loginMember");
        MemberVO jeonchaMember = memberService.getMemberById(contactId+"");
        String jeondaeName = jeondaeMember.getName();
        String jeonchaName = jeonchaMember.getName();

        Map<String, Object> roomInfo = roomService.getRoomInfo(roomId);
        ModelAndView mav = new ModelAndView();
        mav.setViewName("contractWriteForm");
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

        mRoomId.put("roomId", roomId);
        RoomDetailViewVO roomInfo = roomService.getRoomDetailByRoomId(mRoomId);

        String sido = roomInfo.getSido() + " ";
        String sigungu = roomInfo.getSigungu() + " ";
        String bname1 = roomInfo.getBname1();
        bname1 = (bname1 == null) ? "" : bname1 + " ";
        String roadName = roomInfo.getRoadName() + " ";
        String roadJibun = roomInfo.getRoadJibun();
        String roadAddress = sido + sigungu + bname1 + roadName + roadJibun;

        String area = roomInfo.getArea() +"";
        String manageCost = roomInfo.getManageCost()+"";
        String manages = roomInfo.getManages().toString();
        String options = roomInfo.getOptions().toString();

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


    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public ModelAndView registerForm(@RequestParam int contactId,
                                     @RequestParam int roomId,
                                     HttpServletRequest request){
        MemberVO jeondaeMember = (MemberVO)request.getSession().getAttribute("loginMember");
        MemberVO jeonchaMember = memberService.getMemberById(contactId+"");
        String jeondaeName = jeondaeMember.getName();
        String jeonchaName = jeonchaMember.getName();
        Map<String, Object> roomInfo = roomService.getRoomInfo(roomId);
        ModelAndView mav = new ModelAndView();
        mav.setViewName("contractRegisterForm");
        mav.addObject("contactId", contactId);
        mav.addObject("jeondaeName", jeondaeName);
        mav.addObject("jeonchaName", jeonchaName);
        mav.addObject("contactId", contactId);
        mav.addObject("roomInfo", roomInfo);
        mav.addObject("roomId", roomId);
        return mav;
    }

    @ResponseBody
    @RequestMapping(value = "/uploadContract", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void uploadImage(@RequestParam MultipartFile uploadFile,
                            @RequestParam int deposit,
                            @RequestParam int monthlyCost,
                            @RequestParam String from,
                            @RequestParam String to,
                            @RequestParam int roomId,
                            @RequestParam int contactId,
                            HttpServletRequest request,
                            HttpServletResponse response) throws IOException {
        logger.info("upload method entered...");
        String FOLDER_PATH = Constants.CONTRACT_PATH;
        JSONObject res = new JSONObject();
        MemberVO member = (MemberVO) request.getSession().getAttribute("loginMember");

        String uploadFileName = uploadFile.getOriginalFilename();
        uploadFileName = uploadFileName.substring(uploadFileName.lastIndexOf("/")+1);

        ContractVO contract = new ContractVO();
        contract.setSublessorId(member.getMemberId());
        contract.setSublesseeId(contactId);
        contract.setRoomId(roomId);
        contract.setContractForm(uploadFileName);
        contract.setDeposit(deposit);
        contract.setMonthlyCost(monthlyCost);
        contract.setStayFrom(from);
        contract.setStayTo(to);

        if(contractService.registerContract(contract) > 0) {
            FOLDER_PATH += "/"+ contract.getId();
            File uploadPath = new File(REPO_PATH, FOLDER_PATH);
            if(uploadPath.exists() == false){
                uploadPath.mkdirs();
            }
            try{
                File saveFile = new File(uploadPath, uploadFileName);
                uploadFile.transferTo(saveFile);
                res.put("uploadResult", "SUCCESS");
            }catch (Exception e){
                res.put("uploadResult", "FILE_FAIL");
                logger.error(e.getMessage());
            }
        }
        else {
            res.put("uploadResult", "DB_FAIL");
        }
        response.setContentType("application/json; charset=utf-8");
        response.getWriter().print(res);
    }

    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public void downloadImage(@RequestParam String middlePath,
                              @RequestParam String imageFileName,
                              HttpServletRequest request,
                              HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html; charset=utf-8");

        new FileHelper().downloadFile(middlePath, imageFileName, response);
    }
}
