package com.murmuler.organicstack.controller;

import com.murmuler.organicstack.dao.RoomDAO;
import com.murmuler.organicstack.service.RoomService;
import com.murmuler.organicstack.util.Constants;
import com.murmuler.organicstack.util.PostStatusRecord;
import com.murmuler.organicstack.vo.MemberVO;

import com.murmuler.organicstack.vo.RoomSummaryViewVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.*;

@Controller
@RequestMapping("/manage")
public class RoomController {
    private static final String REPOSITORY_PATH = Constants.REPOSITORY_PATH;
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
        ModelAndView mav = new ModelAndView();
        if(member!=null) {
            int memberId = member.getMemberId();
            list = roomService.getMyRooms(memberId);
            mav.setViewName("manage/manageRoom");
            mav.addObject("myRooms", list);
            mav.addObject("isExist", list.size() != 0);
        } else {
            mav.setViewName("redirect:/");
        }

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
                             @RequestParam String floor,
                             @RequestParam String periodNum,
                             @RequestParam String periodUnit,
                             @RequestParam String deposit,
                             @RequestParam String price,
                             @RequestParam String priceType,
                             @RequestParam String adminFee,
                             @RequestParam String adminFeeList,
                             @RequestParam String roomType,
                             @RequestParam String heatType,
                             @RequestParam String optionList,
                             @RequestParam String title,
                             @RequestParam String detail,
                             @RequestParam String hashtagExist,
                             @RequestParam String hashtagList,
                             @RequestParam String imageList,
                             HttpServletRequest request,
                             HttpServletResponse response) throws IOException {
        logger.info("called add method");
        logger.info("hashtaglist : "+ hashtagList);
        Map<String, String> roomInfo = new HashMap<>();
        JSONParser parser = new JSONParser();
        JSONObject addrInfo = new JSONObject();
        JSONObject res = new JSONObject();
        try {
            addrInfo = (JSONObject) parser.parse(allAddr);
//            logger.info("addrInfo : "+addrInfo);
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
        if(jibunAddress[0].charAt(0)=='B') {
            jibunAddress[0] = jibunAddress[0].replace("B", "지하");
        }
        String[] roadAddress = addrInfo.get("roadAddressEnglish").toString().split(",");
        if(roadAddress[0].charAt(0)=='B') {
            roadAddress[0] = roadAddress[0].replace("B", "지하");
        }
        roomInfo.put("jibun", jibunAddress[0]);
        roomInfo.put("roadJibun", roadAddress[0]);
        roomInfo.put("latitude", (String) addrInfo.get("latitude"));
        roomInfo.put("longitude", (String) addrInfo.get("longitude"));
        roomInfo.put("detailAddr", detailAddr);
        roomInfo.put("area", area);
        roomInfo.put("floor", floor);
        roomInfo.put("periodNum", periodNum);
        roomInfo.put("periodUnit", periodUnit);
        roomInfo.put("deposit", deposit);
        roomInfo.put("monthlyCost", price);
        roomInfo.put("rentType", priceType);
        roomInfo.put("manageCost", adminFee);
        roomInfo.put("manageIdList", adminFeeList);
        roomInfo.put("heatType", heatType);
        roomInfo.put("roomType", roomType);
        roomInfo.put("optionList", optionList);
        roomInfo.put("title", title);
        roomInfo.put("detailExplain", detail);
        roomInfo.put("hashtagExist", hashtagExist);
        roomInfo.put("hashtagList", hashtagList);
        roomInfo.put("imageList", imageList);
        MemberVO member = (MemberVO) request.getSession().getAttribute("loginMember");
        roomInfo.put("memberId", member.getMemberId()+"");

        int result;
        if((result=roomService.addRoom(roomInfo)) == RoomDAO.FAIL) {
            res.put("registerResult", "FAIL");
            logger.info("ROOM REGISTER FAIL");
        }
        else {
            res.put("registerResult", "SUCCESS");
            res.put("roomId", result);
            logger.info("ROOM REGISTER SUCCESS");
        }
        response.setContentType("application/json; charset=utf-8");
        response.getWriter().print(res);
    }

    /* ----- 내 방 등록 (사진 업로드) ----- */
    @ResponseBody
    @RequestMapping(value = "/uploadImage", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void uploadImage(@RequestParam MultipartFile[] uploadFile,
                            HttpServletRequest request,
                            HttpServletResponse response) throws IOException {

        int memberId = ((MemberVO) request.getSession().getAttribute("loginMember")).getMemberId();
        int roomId = roomService.getRoomIdByMemberId(memberId);
        ArrayList<String> imgUrlList = new ArrayList<>();

        String uploadFolder = REPOSITORY_PATH;
        String uploadFolderPath = Constants.ROOM_IMG_PATH + roomId;

        // 폴더 생성
        File uploadPath = new File(uploadFolder, uploadFolderPath);
        if(uploadPath.exists() == false){
            uploadPath.mkdirs();
        }

        JSONObject res = new JSONObject();
        int i = 1;
        for(MultipartFile multipartFile : uploadFile){
            String uploadFileName = multipartFile.getOriginalFilename();
            uploadFileName = uploadFileName.substring(uploadFileName.lastIndexOf("/")+1);
            String extension = uploadFileName.substring(uploadFileName.lastIndexOf("."));
            String transFileName = "room"+i+extension;
            i++;

            imgUrlList.add(transFileName);

            try{
                File saveFile = new File(uploadPath, transFileName);
                multipartFile.transferTo(saveFile);
            }catch (Exception e){
                res.put("uploadResult", "FAIL");
                logger.error(e.getMessage());
            }
        }
        if(roomService.addImg(roomId,imgUrlList) >=1 ){
            res.put("uploadResult", "SUCCESS");
        }else{
            res.put("uploadResult", "FAIL");
        }
        response.setContentType("application/json; charset=utf-8");
        response.getWriter().print(res);
    }

    /* ----- 내 방 수정 (사진 업로드) ----- */
    @ResponseBody
    @RequestMapping(value = "/updateImage", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void updateImage(@RequestParam MultipartFile[] oldFile,
                            @RequestParam MultipartFile[] uploadFile,
                            @RequestParam(value = "roomId") int roomId,
                            HttpServletRequest request,
                            HttpServletResponse response) throws IOException {

        JSONObject res = new JSONObject();
        MemberVO memberVO = (MemberVO) request.getSession().getAttribute("loginMember");
        if (memberVO == null) {
            res.put("uploadResult", "NO_LOGIN");
        }else{
            ArrayList<String> imgUrlList = new ArrayList<>();

            String uploadFolder = REPOSITORY_PATH;
            String uploadFolderPath = Constants.ROOM_IMG_PATH + roomId;

            // 폴더 생성
            File uploadPath = new File(uploadFolder, uploadFolderPath);

            if( uploadPath.exists() ) { //파일존재여부확인
                int check = 0;
                if (uploadPath.isDirectory()) { //파일이 디렉토리인지 확인
                    File[] files = uploadPath.listFiles();
                    for (int i = 0; i < files.length; i++) {
                        for(int j = 0; j < oldFile.length; j++){
                            if(files[i].getName().equals(oldFile[j].getOriginalFilename())){
                                check = 1;
                            }
                        }
                        if(check == 0){
                            files[i].delete();
                        }else{
                            check = 0;
                        }
                    }
                }
            }

            if(uploadPath.exists() == false){
                uploadPath.mkdirs();
            }

            int i = 1;

            for(MultipartFile multipartFile : oldFile){
                String oldFileName = multipartFile.getOriginalFilename();
                oldFileName = oldFileName.substring(oldFileName.lastIndexOf("/")+1);
                String extension = oldFileName.substring(oldFileName.lastIndexOf("."));
                String[] str1 = oldFileName.split("\\.");
                String num = str1[0].substring(4);
                String transFileName = "room"+num+extension;
                i = Integer.parseInt(num);
                i++;
                imgUrlList.add(transFileName);
            }

            for(MultipartFile multipartFile : uploadFile){
                String uploadFileName = multipartFile.getOriginalFilename();
                uploadFileName = uploadFileName.substring(uploadFileName.lastIndexOf("/")+1);
                String extension = uploadFileName.substring(uploadFileName.lastIndexOf("."));
                String transFileName = "room"+i+extension;
                i++;

                imgUrlList.add(transFileName);

                try{
                    File saveFile = new File(uploadPath, transFileName);
                    multipartFile.transferTo(saveFile);
                }catch (Exception e){
                    res.put("uploadResult", "FAIL");
                    logger.error(e.getMessage());
                }
            }

            if(imgUrlList.size()!=0){
                if(roomService.modifyImg(roomId,imgUrlList) >=1 ){
                    res.put("uploadResult", "SUCCESS");
                }else{
                    res.put("uploadResult", "FAIL");
                }
            }else{
                res.put("uploadResult", "SUCCESS");
            }

        }
        response.setCharacterEncoding("utf-8");
        response.getWriter().print(res);
    }

    /* ----- 내 방 관리 (사진 다운로드) ----- */
    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public void downloadImage(@RequestParam String middlePath,
                              @RequestParam String imageFileName,
                              HttpServletRequest request,
                              HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html; charset=utf-8");

        OutputStream out = response.getOutputStream();
        String path = REPOSITORY_PATH + middlePath + "/" + imageFileName;

        File imageFile = new File(path);

        response.setHeader("Cache-Control", "no-cache");
        response.addHeader("Content-disposition", "attachment;fileName="+imageFileName);
        FileInputStream in = new FileInputStream(imageFile);
        byte[] buffer = new byte[1024 * 8];
        while(true) {
            int count = in.read(buffer);
            if(count == -1)
                break;
            out.write(buffer, 0, count);
        }
        in.close();
        out.close();
    }

    /* ----- 내 방 관리 -> 수정 -> 내 방 관리 ----- */
    @RequestMapping(value = "/room/update", method = RequestMethod.POST)
    public void alterRoom(@RequestParam String roomId,
                            @RequestParam String allAddr,
                            @RequestParam String detailAddr,
                            @RequestParam String area,
                            @RequestParam String floor,
                            @RequestParam String periodNum,
                            @RequestParam String periodUnit,
                            @RequestParam String deposit,
                            @RequestParam String price,
                            @RequestParam String priceType,
                            @RequestParam String adminFee,
                            @RequestParam String adminFeeList,
                            @RequestParam String roomType,
                            @RequestParam String heatType,
                            @RequestParam String optionList,
                            @RequestParam String title,
                            @RequestParam String detail,
                            @RequestParam String hashtagExist,
                            @RequestParam String hashtagList,
                            @RequestParam String imageList,
                            @RequestParam String isNotChangeAddr,
                            @RequestParam String isNotChangeDtAddr,
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
            if(jibunAddress[0].charAt(0)=='B') {
                jibunAddress[0] = jibunAddress[0].replace("B", "지하");
            }
            String[] roadAddress = addrInfo.get("roadAddressEnglish").toString().split(",");
            if(roadAddress[0].charAt(0)=='B') {
                roadAddress[0] = roadAddress[0].replace("B", "지하");
            }
            roomInfo.put("jibun", jibunAddress[0]);
            roomInfo.put("roadJibun", roadAddress[0]);
            roomInfo.put("latitude", (String) addrInfo.get("latitude"));
            roomInfo.put("longitude", (String) addrInfo.get("longitude"));
        }
        roomInfo.put("detailAddr", detailAddr);
        roomInfo.put("isNotChangeDtAddr", isNotChangeDtAddr);
        
        roomInfo.put("area", area);
        roomInfo.put("isNotChangeAddr", isNotChangeAddr);
        roomInfo.put("floor", floor);
        roomInfo.put("periodNum", periodNum);
        roomInfo.put("periodUnit", periodUnit);
        roomInfo.put("deposit", deposit);
        roomInfo.put("monthlyCost", price);
        roomInfo.put("rentType", priceType);
        roomInfo.put("manageCost", adminFee);
        roomInfo.put("manageIdList", adminFeeList);
        roomInfo.put("heatType", heatType);
        roomInfo.put("roomType", roomType);
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
            logger.info("ROOM UPDATE SUCCESS");
        }
        else {
            res.put("updateResult", "FAIL");
            logger.info("ROOM UPDATE FAIL");
        }

        response.setContentType("application/json; charset=utf-8");
        response.getWriter().print(res);
    }

//    @RequestMapping(value = "/update/{roomId}", method = RequestMethod.GET)
//    public ModelAndView updateRoom(@PathVariable int roomId){
//
//        Map<String, Object> room = roomService.getRoomInfo(roomId);
//
////        logger.info("roomVO: "+ room.get("roomVO"));
//        ModelAndView mav = new ModelAndView();
//        mav.setViewName("/manage/updateRoom");
//        mav.addObject("room", room);
//        mav.addObject("roomId", roomId);
//        return mav;
//    }

    @RequestMapping(value = "/update/{roomId}", method = RequestMethod.GET)
    public ModelAndView updateRoom(@PathVariable int roomId,
                                   HttpServletRequest request) {

        MemberVO member = (MemberVO) request.getSession().getAttribute("loginMember");
        int memberId = member.getMemberId();
        List<Integer> list;
        list = roomService.getRoomIdListByMemberId(memberId);
        ModelAndView mav = new ModelAndView();

        if(list == null){
            mav.setViewName("/error");
            return mav;
        }
        else if(list.contains(roomId) == true){
            Map<String, Object> room = roomService.getRoomInfo(roomId);
            mav.setViewName("/manage/updateRoom");
            mav.addObject("room", room);
            mav.addObject("roomId", roomId);
            return mav;
        }else{
            mav.setViewName("/error");
            return mav;
        }
    }

    /* ----- 내 방 관리 -> 삭제 -> 내 방 관리 ----- */
    @RequestMapping(value = "/room/delete", method = RequestMethod.POST)
    public void eraseRoom(@RequestParam int roomId,
                          HttpServletRequest request,
                          HttpServletResponse response) throws IOException {
        logger.info(String.format("eraseRoom method entered... roomId: %d", roomId));
        JSONObject res = new JSONObject();

        // 세션 정보 가져와서 삭제 할 roomId가 member_id로 roomId 찾은후
        // 제거할 roomId가 포함된다면 삭제 진행
        // 없으면 DELETE_FAIL 보내주기

        MemberVO member = (MemberVO) request.getSession().getAttribute("loginMember");
        int memberId = member.getMemberId();
        List<Integer> list;
        list = roomService.getRoomIdListByMemberId(memberId);

//        System.out.println("list ; " + list);

        if(list == null){
            res.put("deleteResult", "DELETE_FAIL");
        }
        else if(list.contains(roomId) == true){
            int result = roomService.removeRoom(roomId);
            if(result > 0) {
                res.put("deleteResult", "SUCCESS");
            } else {
                res.put("deleteResult", "DELETE_FAIL");
            }
        }else{
            res.put("deleteResult", "DELETE_FAIL");
        }

        response.setContentType("application/json; charset=utf-8");
        response.getWriter().print(res);
    }

//    /* ----- 내 방 관리 -> 삭제 -> 내 방 관리 ----- */
//    /* ----- 방 삭제시 폴더, 파일 삭제 적용 ----- */
//    @RequestMapping(value = "/room/delete", method = RequestMethod.POST)
//    public void eraseRoom(@RequestParam int roomId,
//                          HttpServletResponse response) throws IOException {
//        logger.info(String.format("eraseRoom method entered... roomId: %d", roomId));
//        JSONObject res = new JSONObject();
//        int result = roomService.removeRoom(roomId);
//        if(result > 0) {
//            // 폴더 및 파일 삭제하기
//            File deleteFolder = new File(REPOSITORY_PATH, Constants.ROOM_IMG_PATH + roomId);
//            if( deleteFolder.exists() ) {
//                File[] deleteFileList = deleteFolder.listFiles();
//                    for (int i = 0; i < deleteFileList.length; i++) {
//                        deleteFileList[i].delete(); // 파일 삭제
//                    }
//                    if(deleteFolder.isDirectory()){
//                        deleteFolder.delete(); // 폴더 삭제
//                    }
//            }
//            res.put("deleteResult", "SUCCESS");
//        } else {
//            res.put("deleteResult", "DELETE_FAIL");
//        }
//        response.setContentType("application/json; charset=utf-8");
//        response.getWriter().print(res);
//    }

    @RequestMapping(value = "/post-status", method = RequestMethod.POST)
    public void changePost(@RequestParam int roomId,
                           @RequestParam String postType,
                           HttpServletRequest request,
                           HttpServletResponse response) throws IOException {
        logger.info(String.format("changePost method entered... ri: %d, pt: %s", roomId, postType));
        JSONObject res = new JSONObject();

        MemberVO member = (MemberVO) request.getSession().getAttribute("loginMember");
        int memberId = member.getMemberId();
        List<Integer> list;
        list = roomService.getRoomIdListByMemberId(memberId);
        if(list == null){
            res.put("result", "XSS_FAIL");
        }
        else if(list.contains(roomId) == true){
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
        }else{
            res.put("result", "XSS_FAIL");
        }

        response.setContentType("application/json; charset=utf-8");
        response.getWriter().print(res);
    }

}
