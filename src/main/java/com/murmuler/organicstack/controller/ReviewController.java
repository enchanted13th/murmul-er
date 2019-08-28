package com.murmuler.organicstack.controller;

import com.murmuler.organicstack.service.ReviewService;
import com.murmuler.organicstack.util.Constants;
import com.murmuler.organicstack.vo.MemberVO;
import com.murmuler.organicstack.vo.ReviewVO;
//import oracle.jdbc.driver.Const;
//import oracle.jdbc.driver.Const;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.Date;
import java.util.*;

@Controller
@RequestMapping("/review")
public class ReviewController {
    Log logger = LogFactory.getLog(ReviewController.class);
    @Autowired
    private ReviewService reviewService;

    @RequestMapping(value="", method= RequestMethod.GET)
    public ModelAndView reviewList(@RequestParam int page,
                                   @RequestParam String order){
        ModelAndView mav = new ModelAndView();

        List<ReviewVO> reviewList = new ArrayList<>();
        switch (order){
            case "latest":
                reviewList = reviewService.getReviewList(page);
                break;
            case "star":
                reviewList = reviewService.getStarOrder(page);
                break;
            case "noise":
                reviewList = reviewService.getNoiseOrder(page);
                break;
            case "insect":
                reviewList = reviewService.getInsectOrder(page);
                break;
        }

        int total = reviewService.getReviewButtonCnt();
        int reviewCnt = reviewService.getReviewTotalCnt();

        int startpage = 1;
        if(total > 5){
            if(page > 3) startpage = page - 2;
            if(page >= total-2) startpage = total - 4;
        }

        mav.addObject("curpage", page);
        mav.addObject("order", order);
        mav.addObject("startpage", startpage);
        mav.addObject("total", total);
        mav.addObject("reviewCnt", reviewCnt);
        mav.addObject("reviewList", reviewList);
        mav.setViewName("review");

        return mav;
    }

    @RequestMapping(value="/popup", method= RequestMethod.POST)
    @ResponseBody
    public Object reviewListByReviewId(@RequestParam("reviewId") int reviewId,
                                             HttpServletResponse response) throws IOException{

        ReviewVO reviewVO = reviewService.getReviewListByReviewId(reviewId);
        HashMap<String, Object> map = new HashMap<String, Object>();
        if (reviewVO != null) {
            map.put("reviewResult", "SUCCESS");
            map.put("review", reviewVO);
        } else {
            map.put("reviewResult", "FAIL");
        }
        return map;
    }

    @RequestMapping(value="/write", method= RequestMethod.GET)
    public ModelAndView reviewWrite(HttpServletRequest request){
        ModelAndView mav = new ModelAndView();
        MemberVO memberVO = (MemberVO) request.getSession().getAttribute("loginMember");
        if (memberVO == null) {
            mav.addObject("isRegistered", "NOT_LOGIN");
        } else if (reviewService.isThisWhoRegisteredRoom(memberVO.getMemberId())) {
            mav.addObject("isRegistered", "TRUE");
        } else {
            mav.addObject("isRegistered", "FALSE");
        }
        mav.setViewName("reviewWrite");
        return mav;
    }

    @RequestMapping(value = "/write", method = RequestMethod.POST)
    public void reviewWriteSubmit(@RequestParam("title") String title,
                                  @RequestParam("detailAddr") String detailAddr,
                                  @RequestParam("residencePeriod") String residencePeriod,
                                  @RequestParam("periodUnit") String periodUnit,
                                  @RequestParam("score") String score,
                                  @RequestParam("content") String content,
                                  @RequestParam("advantage") String advantage,
                                  @RequestParam("disadvantage") String disadvantage,
                                  @RequestParam("insectLevel") String insectLevel,
                                  @RequestParam("noiseLevel") String noiseLevel,
                                  @RequestParam("hashtagExist") String hashtagExist,
                                  @RequestParam("totAddr") String totAddr,
                                  @RequestParam("hashTag1") String hashTag1,
                                  @RequestParam("hashTag2") String hashTag2,
                                  @RequestParam("hashTag3") String hashTag3,
                                  HttpServletRequest request,
                                  HttpServletResponse response) throws IOException{
        logger.info("review write method entered...");
        MemberVO member = (MemberVO) request.getSession().getAttribute("loginMember");
        JSONObject res = new JSONObject();
        if (member == null) {
            res.put("reviewWriteResult", "NOT_LOGIN");
        } else if (reviewService.isThisWhoRegisteredRoom(member.getMemberId())) {
            res.put("reviewWriteResult", "UNABLE_TO_WRITE");
        } else {
            int memberId = member.getMemberId();
            JSONObject json = (JSONObject) JSONValue.parse(totAddr);
            json.put("detailAddr", detailAddr);
            Map<String, String> locationInfo = new HashMap<String, String>();
            locationInfo.put("sido", (String)json.get("sido"));
            locationInfo.put("sigungu", (String)json.get("sigungu"));
            locationInfo.put("bname", (String)json.get("bname"));
            locationInfo.put("bname1", (String)json.get("bname1"));
            locationInfo.put("bname2", (String)json.get("bname2"));

            String jibunAddressEnglish = (String)json.get("jibunAddressEnglish");
            String[] jibunAddress =  jibunAddressEnglish.split(",");
            String jibun = jibunAddress[0];
            json.put("jibun",jibun);
            locationInfo.put("jibun", (String)json.get("jibun"));

            locationInfo.put("roadName", (String)json.get("roadname"));

            String roadAddressEnglish = (String)json.get("roadAddressEnglish");
            String[] roadAddress =  roadAddressEnglish.split(",");
            String roadJibun = roadAddress[0];
            json.put("roadJibun", roadJibun);
            locationInfo.put("roadJibun", (String)json.get("roadJibun"));

            locationInfo.put("detailAddr", (String)json.get("detailAddr"));
            locationInfo.put("latitude", (String)json.get("latitude"));
            locationInfo.put("longitude", (String)json.get("longitude"));


            int locationId = reviewService.addLocation(locationInfo);
            boolean hashTagExist = false;
            if(hashtagExist.equals("Y")){
                hashTagExist = true;
            }

            ArrayList<String> hashTagList = null;
            if(hashTagExist) {
                hashTagList = new ArrayList<>();
                if (!hashTag1.trim().equals("")) {
                    hashTagList.add(hashTag1);
                }
                if (!hashTag2.trim().equals("")) {
                    hashTagList.add(hashTag2);
                }
                if (!hashTag3.trim().equals("")) {
                    hashTagList.add(hashTag3);
                }
            }
            int result = reviewService.addReview(new ReviewVO(1, Date.valueOf("2019-08-11"), title,content,locationId,Integer.parseInt(residencePeriod),periodUnit,Integer.parseInt(score),advantage,disadvantage,insectLevel.charAt(0),noiseLevel.charAt(0),hashtagExist,"","","","","", hashTagList, memberId));

            if (result > 0) { // 문의 등록 성공
                res.put("reviewWriteResult", "SUCCESS");
                res.put("reviewId", result);
            } else {
                res.put("reviewWriteResult", "WRITE_FAIL");
            }
        }
        response.setContentType("application/html; charset=utf-8");
        response.getWriter().print(res);
    }

    @ResponseBody
    @RequestMapping(value = "/uploadImage", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void uploadImage(@RequestParam MultipartFile[] uploadFile,
                            @RequestParam String reviewId,
                            HttpServletResponse response) throws IOException {
        logger.info("review upload img entered...");
        String image="";
        String uploadFolder = Constants.REPOSITORY_PATH;
        String uploadFolderPath = Constants.REVIEW_IMG_PATH + reviewId;
        JSONObject res = new JSONObject();

        File uploadPath = new File(uploadFolder, uploadFolderPath);
        if(uploadPath.exists() == false){
            uploadPath.mkdirs();
        }

        int i=0;
        for(MultipartFile multipartFile : uploadFile){
            String uploadFileName = multipartFile.getOriginalFilename();
            uploadFileName = uploadFileName.substring(uploadFileName.lastIndexOf("/")+1);
            image = "/"+uploadFileName;

            try{
                File saveFile = new File(uploadPath, uploadFileName);
                multipartFile.transferTo(saveFile);
            }catch (Exception e){
                res.put("uploadResult", "FAIL");
                logger.error(e.getMessage());
            }
        }
        if(reviewService.addImg(Integer.parseInt(reviewId),image) >=1 ){
            res.put("uploadResult", "SUCCESS");

        }else{
            res.put("uploadResult", "FAIL");
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

        String REPOSITORY_PATH = Constants.REPOSITORY_PATH;
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

}
